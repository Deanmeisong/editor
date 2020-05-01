
function setUpInstanceName() {

    $('#instance-name-typeahead').typeahead({highlight: true}, {
        name: 'name-typeahead',
        displayKey: 'value',
        source: nameByFullName.ttAdapter()})
        .on('typeahead:opened', function($e,datum) {
            // Start afresh.
        })
        .on('typeahead:selected', function($e,datum) {
            $('#instance_name_id').val(datum.id);
        })
        .on('typeahead:autocompleted', function($e,datum) {
            $('#instance_name_id').val(datum.id);
        })
        .on('typeahead:closed', function($e,datum) {
            // NOOP: cannot distinguish tabbing through vs emptying vs typing text.
            // Users must select or autocomplete.
        });
}

window.setUpInstanceName = setUpInstanceName;


window.nameByFullName = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: window.relative_url_root + '/names/typeahead_on_full_name?term=%QUERY',
    limit: 100
});

// kicks off the loading/processing of `local` and `prefetch`
nameByFullName.initialize();

window.nameByFullName = nameByFullName;
