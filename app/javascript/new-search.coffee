
# Action        Set Size   Target                                    DefaultFieldCriterion  [field:criterion].... 
# [list|count] [set-size] [names|references|authors|instances|tree] [default field string]  [field:criterion].... 
#

window.captureSearch = () ->
  console.log('captureSearch')
  str = $('#query-string-field').val();
  console.log(str)
  fields = parseSearchString(str)
  captureFields(fields)

window.parseSearchString = (searchString, verbose = false) ->
  console.log(" ")
  console.log("parseSearchString for: #{searchString}")
  searchTokens = searchString.trim().replace(/:/g,': ').replace(/:  /g,': ').split(" ")
  [action,searchTokens] = parseAction(searchTokens)
  [setSize,limited, searchTokens] = parseSetSize(searchTokens)
  [term,searchTokens] = parseDefaultSearchTerm(searchTokens)
  [wherePairs,searchTokens] = parseWherePairs(searchTokens)
  fields = {action: action, limited: limited, setSize: setSize, conditions: "", format: "", term: term, wherePairs: wherePairs}
  console.log("Action: #{fields.action}")
  console.log("Limited: #{fields.limited}")
  console.log("SetSize: #{fields.setSize}")
  console.log("term: #{fields.term}")
  console.log("wherePairs: #{fields.wherePairs}")
  fields

parseAction = (tokens) ->
  defaultAction = 'list'
  switch tokens[0]
    when "count" then action = "count";  tokens = _.rest(tokens)
    when "list" then  action = "list";   tokens = _.rest(tokens)
    else              action = defaultAction
  [action, tokens]

parseSetSize = (tokens) ->
  console.log("parseSetSize for tokens: #{tokens.join(',')}")
  defaultSetSize = 100
  tokens = [defaultSetSize.toString()] unless tokens[0]
  switch 
    when tokens[0].match(/[0-9]+/) then limited = true; setSize = parseInt(tokens[0]); tokens = _.rest(tokens)
    when tokens[0].match(/^all$/i) then limited = false; setSize = defaultSetSize; tokens = _.rest(tokens)
    else                                limited = true; setSize = defaultSetSize
  [setSize, limited, tokens]

isFieldName = (str) ->
  str.match(/:/)

parseDefaultSearchTerm = (tokens) ->
  console.log("parseDefaultSearchTerm for tokens: #{tokens}")
  ndx = _.findIndex(tokens,isFieldName)
  if ndx >= 0
    termTokens = tokens.slice(0,ndx)
    term = termTokens.join(' ')
    tokens = tokens.slice(ndx)
  else # no field
    term = tokens.join(' ')
    tokens = []
  [term,tokens]

parseWherePairs = (tokens) ->
  console.log("parseWherePairs for: #{tokens.join(' ')}")
  wherePairs = []
  while tokens.length > 0
    [pair, tokens] = parseOnePair(tokens)
    wherePairs.push(pair) if pair
  [wherePairs, tokens]

parseOnePair = (tokens) ->
  console.log("parseOneWherePair for: #{tokens.join(' ')}")
  switch 
    when tokens.length == 0
      pair = null 
      tokens = []
    when isFieldName(tokens[0])
      field = tokens[0]
      [value,tokens] = parseOneValue(tokens.slice(1))
      console.log("Got back value: #{value}")
      pair = {field: field, value: value}
    else
      throw "Exception!!! Expected '#{tokens[0]}' to be a field name"
  [pair, tokens]

parseOneValue = (tokens) ->
  console.log("parseOneValue for: #{tokens.join(' ')}")
  value = ""
  until tokens.length == 0 || isFieldName(tokens[0])
    console.log("token zero: #{tokens[0]}")
    value += " #{tokens[0]}"
    tokens = tokens.slice(1)
  console.log("Returning: value: #{value}")
  [value.trim(), tokens]

captureFields = (fields) ->
  target = $('#query-target').val()
  console.log("target: #{target}")
  switch 
    when target.match(/^authors$/i)    then window.captureAuthorFields(fields)
    when target.match(/^names$/i)      then window.captureNameFields(fields)
    when target.match(/^references$/i) then window.captureReferenceFields(fields)
    when target.match(/^instances$/i)  then window.captureInstanceFields(fields)
    when target.match(/^tree$/i)       then ''
    else                               throw("unknown target: #{target}") #     window.captureNameFields(fields)

captureTreeFields = (fields) ->
  $('a#advanced-search-tab-link-tree').click()

searchableFieldClick = (event,$element) ->
  debug('searchableFieldClick')
  $('#query-string-field').val($('#query-string-field').val() + ' ' + $element.html().replace(/<[^>]*>/g,'').trim())
  $('#query-string-field').focus();

  ####

jQuery -> 
  window.debug('new search')
  $('body').on('click','a.searchable-field', (event) -> searchableFieldClick(event,$(this)))
  #$('body').on('click','#name-advanced-search-capture', (event) ->         captureSearch(event,$(this)))

