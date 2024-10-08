// Generated by CoffeeScript 2.6.1
(function() {
  var appendToQueryField, buildQueryString, cancelDeleteInstanceNote, cancelInstanceNoteEdit, cancelLinkClick, changeFocus, changeNameCategoryOnEditTab, changeTreeFocus, checkSearchResultCB, clearQueryField, clickOnFocus, clickSearchResultCB, closeOpenPopups, confirmNameRefreshChildrenButtonClick, copyInstanceForNameFormEnter, copyInstanceLinkClicked, copyNameFormEnter, createCopyOfNameClick, createInstancesBatchSubmit, createMatchesBatchSubmit, currentActiveTab, debug, debugObject, deleteInstanceNote, dropdownSubmenuClick, hideDetails, hidePopupOrAddHider, hideSearchResultDetailsIfMenusOpen, instanceNoteEnableOrDisableSaveButton, instanceNoteKeyIdSelectChanged, linkToRunCasClicked, linkToRunDiffClicked, linkToRunValRepClicked, loaderBulkShowStatsClicked, makeTargetInvisible, makeTargetVisible, nameDeleteFormSubmit, nameRankIdChanged, optionalFocusOnPageLoad, populateList, positionOnTheRight, queryonSelectChanged, recordCurrentActiveTab, refreshPageLinkClick, reviewResultKeyNavigation, searchFieldChanged, searchResultFocus, searchResultKeyNavigation, searchResultRecordType, searchResultsCheckedCount, showFieldIsNotYetSaved, showSearchResultDetailsIfMenusClosed, toggleVisibleHidden, treeRowClicked, treeRowClicked2, unCheckSearchResultCB, unconfirmedActionLinkClick;

  debug = function(s) {
    var error;
    try {
      if (debugSwitch === true) {
        return console.log('debug: ' + s);
      }
    } catch (error1) {
      error = error1;
    }
  };

  window.debug = debug;

  window.notice = function(s) {
    var error;
    try {
      return console.log('notice: ' + s);
    } catch (error1) {
      error = error1;
    }
  };

  debugObject = function(obj) {
    debug('show object');
    $.each(obj, function(key, element) {
      if (element) {
        return debug("key: " + key + "\n" + "value: " + element);
      }
    });
  };

  $(document).on("load", function() {
    debug('document load, via fresh.js');
  });
  $(document).on("turbolinks:load", function() {
    debug('turbolinks:load, via fresh.js');
  });
  $(document).on("turbo:load", function() {
    debug('turbo:load, via fresh.js');
  });

  $(window).on('load', function(){ 
    debug('jquery loaded, via fresh.js');
  });

  $(document).on("turbo:load", function() {
    debug('Start of fresh.js turbo loaded');
    debug('jQuery version: ' + $().jquery);
    $('body').on('click', '.edit-details-tab', function(event) {
      return loadDetails(event, $(this), true);
    });
    $('body').on('click', '.change-name-category-on-edit-tab', function(event) {
      return changeNameCategoryOnEditTab(event, $(this), true);
    });
    $('body').on('click', '#master-checkbox.stylish-checkbox', function(event) {
      return masterCheckboxClicked(event, $(this));
    });
    $('tr.search-result').keydown(function(event) {
      return searchResultKeyNavigation(event, $(this));
    });

    $('tr.search-result td.takes-focus').click(function(event) {
      return searchResultFocus(event, $(this).parent('tr'));
    });

    $('tr.review-result').keydown(function(event) {
      return reviewResultKeyNavigation(event, $(this));
    });

    $('body').on('focus', 'tr.review-result td.takes-focus', function(event) {
      return searchResultFocus(event, $(this).parent('tr'));
    });

    $('body').on('click', 'span.details-toggle', function(event) {
      return hideDetails(event, $(this));
    });

    $('body').on('click', '#switch-off-details-tab', function(event) {
      return hideDetails(event, $(this));
    });

    if (window.location.hash) {
      $('a#' + window.location.hash).click();
    }
    $('body').on('click', 'a.append-to-query-field', function(event) {
      return appendToQueryField(event, $(this));
    });
    $('body').on('click', 'a.clear-query-field', function(event) {
      return clearQueryField(event, $(this));
    });
    $('body').on('click', 'a.instance-note-delete-link', function(event) {
      return deleteInstanceNote(event, $(this));
    });
    $('body').on('click', 'a.instance-note-cancel-delete-link', function(event) {
      return cancelDeleteInstanceNote(event, $(this));
    });
    $('body').on('click', 'a.instance-note-cancel-edit-link', function(event) {
      return cancelInstanceNoteEdit(event, $(this));
    });
    $('body').on('change', '.instance-note-key-id-select', function(event) {
      return instanceNoteKeyIdSelectChanged(event, $(this));
    });
    $('body').on('click', '.build-query-button', function(event) {
      return buildQueryString(event, $(this));
    });
    $('#search-field').change(function(event) {
      return searchFieldChanged(event, $(this));
    });
    $('body').on('change', 'select#query-on', function(event) {
      return queryonSelectChanged(event, $(this));
    });
    // $('body').on('click','li.dropdown-submenu a', (event) ->                 dropdownSubmenuClick(event,$(this)))
    $('body').on('click', 'a.unconfirmed-delete-link', function(event) {
      return unconfirmedActionLinkClick(event, $(this));
    });
    $('body').on('click', 'a.unconfirmed-action-link', function(event) {
      return unconfirmedActionLinkClick(event, $(this));
    });
    $('body').on('click', 'a.cancel-link', function(event) {
      return cancelLinkClick(event, $(this));
    });
    $('body').on('click', 'a.cancel-action-link', function(event) {
      return cancelLinkClick(event, $(this));
    });
    $('body').on('click', '#refresh-page-from-details-link', function(event) {
      return refreshPageLinkClick(event, $(this));
    });
    $('body').on('click', '.refresh-page-link', function(event) {
      return refreshPageLinkClick(event, $(this));
    });
    $('body').on('change', '#name_name_rank_id', function(event) {
      return nameRankIdChanged(event, $(this));
    });
    $('body').on('click', '.cancel-new-record-link', function(event) {
      return cancelNewRecord(event, $(this));
    });
    $('body').on('click', '#instance-reference-typeahead', function(event) {
      return $(this).select();
    });
    $('body').on('click', '.tree-row div.head', function(event) {
      return treeRowClicked(event, $(this));
    });
    $('body').on('submit', '#name-delete-form', function(event) {
      return nameDeleteFormSubmit(event, $(this));
    });
    $('body').on('click', '#confirm-name-refresh-children-button', function(event) {
      return confirmNameRefreshChildrenButtonClick(event, $(this));
    });
    $('body').on('keydown', '#copy-name-form', function(event) {
      return copyNameFormEnter(event, $(this));
    });
    $('body').on('keydown', '#copy-instance-for-name-form', function(event) {
      return copyInstanceForNameFormEnter(event, $(this));
    });
    $('body').on('click', '#create-copy-of-name', function(event) {
      return createCopyOfNameClick(event, $(this));
    });
    $('body').on('click', '#create-instances-batch-submit', function(event) {
      return createInstancesBatchSubmit(event, $(this));
    });
    $('body').on('click', '#create-matches-batch-submit', function(event) {
      return createMatchesBatchSubmit(event, $(this));
    });
    $('body').on('click', '#copy-instance-link', function(event) {
      return copyInstanceLinkClicked(event, $(this));
    });
    $('body').on('click', '#link-to-run-cas', function(event) {
      return linkToRunCasClicked(event, $(this));
    });
    $('body').on('click', '#link-to-run-diff', function(event) {
      return linkToRunDiffClicked(event, $(this));
    });
    $('body').on('click', '#link-to-run-valrep', function(event) {
      return linkToRunValRepClicked(event, $(this));
    });
    $('body').on('click', '#loader-bulk-stats-submit', function(event) {
      return loaderBulkShowStatsClicked(event, $(this));
    });
    $('body').on('click', '#loader-bulk-stats-refresh', function(event) {
      return loaderBulkShowStatsClicked(event, $(this));
    });
    debug("on load - search-target-button-text: " + $('#search-target-button-text').text().trim());
    if (typeof showOrHideCultivarCommonCbox === 'function') {
      window.showOrHideCultivarCommonCbox($('#search-target-button-text').text().trim());
    }
    // When tabbing to search-result record, need to click to trigger retrieval of details.
    $('a.show-details-link[tabindex]').focus(function(event) {
      return clickOnFocus(event, $(this));
    });
    optionalFocusOnPageLoad();
    return debug('End of fresh.js document ready.');
  });

  optionalFocusOnPageLoad = function() {

    try {
    debug('optionalFocusOnPageLoad start');
    var focusId, focusSelector;
    focusId = $('#focus_id').val();
    if (!focusId) {
      return $('table.search-results tr td.takes-focus a.show-details-link[tabindex]').first().click();
    } else {
      focusSelector = `#${focusId.replace(/::.*-/g, '-')}`;

      if ($(focusSelector).length === 1) {
        return $(focusSelector).click();
      } else {
        return $('table.search-results tr td.takes-focus a.show-details-link[tabindex]').first().click();
      }
    }
  }
    catch(err) {
      debug('optionalFocusOnPageLoad Error: ' + err.toString());
      return;
    }
  };

  window.showInstanceWasCreated = function(recordId, fromRecordType, fromRecordId) {
    return debug(`showInstanceWasCreated: recordId: ${recordId}; fromRecordType: ${fromRecordType}; fromRecordId: ${fromRecordId}`);
  };

  window.showRecordWasDeleted = function(recordId, recordType) {
    $("#search-result-details").addClass('hidden');
    $('#search-result-details').html('');
    return $(`#search-result-${recordId}`).addClass('hidden');
  };

  window.cancelNewRecord = function(event, $element) {
    $("#search-result-details").addClass('hidden');
    $(`#${$element.attr('data-element-id')}`).addClass('hidden');
    return false;
  };

  confirmNameRefreshChildrenButtonClick = function(event, $the_button) {
    debug('confirmNameRefreshChildrenButtonClick');
    $the_button.attr('disabled', 'true');
    $('#cancel-refresh-children-link').attr('disabled', 'true');
    $('#name-refresh-tab').attr('disabled', 'true');
    $('#search-result-details-error-message-container').html('');
    return $('#refresh-children-spinner').removeClass('hidden');
  };

  copyNameFormEnter = function(event, $the_button) {
    var enter_key_code, key;
    key = event.which;
    enter_key_code = 13;
    if (key === enter_key_code) {
      if ($('#confirm-or-cancel-copy-name-link-container').hasClass('hidden')) {
        // Show the confirm/cancel buttons
        $('#confirm-or-cancel-copy-name-link-container').removeClass('hidden');
        return false;
      } else {
        $('#create-copy-of-name').click();
        return false;
      }
    } else {
      return true;
    }
  };

  createCopyOfNameClick = function(event, $the_element) {
    debug('createCopyOfNameClick');
    $('#copy-name-error-message-container').html('');
    $('#copy-name-error-message-container').addClass('hidden');
    $('#copy-name-info-message-container').html('');
    $('#copy-name-info-message-container').addClass('hidden');
    return true;
  };

  copyInstanceLinkClicked = function(event, $the_element) {
    debug('copyInstanceLinkClicked');
    $('#confirm-or-cancel-copy-instance-link-container').removeClass('hidden');
    return event.preventDefault();
  };

  linkToRunCasClicked = function(event, $the_element) {
    debug('linkToRunCasClicked');
    $('#link-to-run-cas').hide();
    $('#cas-report-is-running-indicator').removeClass('hidden');
    event = new Date();
    return $('#cas-report-is-running-indicator').html('Report started running at ' + event.toTimeString().replace(/ GMT.*/, ""));
  };

  linkToRunDiffClicked = function(event, $the_element) {
    debug('linkToRunDiffClicked');
    $('#link-to-run-diff').hide();
    $('#diff-is-running-indicator').removeClass('hidden');
    event = new Date();
    return $('#diff-is-running-indicator').html('Report started running at ' + event.toTimeString().replace(/ GMT.*/, ""));
  };

  linkToRunValRepClicked = function(event, $the_element) {
    debug('linkToRunValRepClicked');
    $('#link-to-run-valrep').hide();
    $('#val-report-is-running-indicator').removeClass('hidden');
    event = new Date();
    return $('#val-report-is-running-indicator').html('Report started running at ' + event.toTimeString().replace(/ GMT.*/, ""));
  };

  copyInstanceForNameFormEnter = function(event, $the_button) {
    var enter_key_code, key;
    key = event.which;
    enter_key_code = 13;
    if (key === enter_key_code) {
      if ($('#confirm-or-cancel-copy-instance-link-container').hasClass('hidden')) {
        // Show the confirm/cancel buttons
        $('#confirm-or-cancel-copy-instance-link-container').removeClass('hidden');
        return false;
      } else {
        $('#create-copy-of-instance').click();
        return false;
      }
    } else {
      return true;
    }
  };

  createMatchesBatchSubmit = function(event, $the_element) {
    $('#search-result-details-info-message-container').html('Working....');
    return true;
  };

  createInstancesBatchSubmit = function(event, $the_element) {
    $('#search-result-details-info-message-container').html('Working....');
    return true;
  };

  nameDeleteFormSubmit = function(event, $element) {
    $('#confirm-delete-name-button').attr('disabled', 'true');
    $('#cancel-delete-link').attr('disabled', 'true');
    $('#name-delete-tab').attr('disabled', 'true').addClass('disabled');
    $('#search-result-details-error-message-container').html('');
    $('#name-delete-spinner').removeClass('hidden');
    return true;
  };

  refreshPageLinkClick = function(event, $element) {
    return location.reload();
  };

  window.setDependents = function(fieldId) {
    var fieldSelector, fieldValue;
    fieldSelector = `#${fieldId}`;
    fieldValue = $(fieldSelector).val();
    fieldValue = fieldValue.replace(/\s/g, '');
    if (fieldValue === '') {
      $(`.requires-${fieldId}[value=='']`).attr('disabled', 'true');
      $(`input.requires-${fieldId}`).removeClass('enabled').addClass('disabled');
      return $(`.hide-if-${fieldId}`).removeClass('hidden');
    } else {
      $(`.requires-${fieldId}`).removeAttr('disabled');
      $(`input.requires-${fieldId}`).removeClass('disabled').addClass('enabled');
      return $(`.hide-if-${fieldId}`).addClass('hidden');
    }
  };

  nameRankIdChanged = function(event, $element) {
    if ($element.val() === "") {
      $('.requires-rank').attr('disabled', 'true');
      $('input.requires-rank').removeClass('enabled').addClass('disabled');
      return $('.hide-if-rank').removeClass('hidden');
    } else {
      $('.requires-rank').removeAttr('disabled');
      $('input.requires-rank').removeClass('disabled').addClass('enabled');
      return $('.hide-if-rank').addClass('hidden');
    }
  };

  // Do NOT close the menu when submenu is clicked.
  dropdownSubmenuClick = function(event, $element) {
    event.preventDefault();
    return event.stopPropagation();
  };

  showSearchResultDetailsIfMenusClosed = function() {
    debug('showSearchResultDetailsIfMenusClosed');
    if ($('li.dropdown.open').length === 0) {
      return $('#search-result-details').show();
    }
  };

  hideSearchResultDetailsIfMenusOpen = function() {
    debug('hideSearchResultDetailsIfMenusOpen');
    if ($('li.dropdown.open').length > 0) {
      return $('#search-result-details').hide();
    }
  };

  queryonSelectChanged = function(event, $element) {
    debug(`queryonSelectChanged to: ${$element.val()} `);
    switch ($element.val()) {
      case 'author':
        setAuthorQueryOptions();
        break;
      case 'instance':
        setInstanceQueryOptions();
        break;
      case 'name':
        setNameQueryOptions();
        break;
      case 'reference':
        setReferenceQueryOptions();
        break;
      case 'tree':
        setTreeQueryOptions();
    }
    return $('#query-field').focus();
  };

  window.setAuthorQueryOptions = function() {
    debug('setAuthorQueryOptions');
    populateSelect($('select#query-field'), authorQueryOptions);
    populateList($('ul#query-list'), $('#author-query-options-storage').html());
    $('#query_common_and_cultivar').attr('disabled', true);
    return $('#query_common_and_cultivar_label').addClass('disabled');
  };

  window.setInstanceQueryOptions = function() {
    debug('setInstanceQueryOptions');
    populateSelect($('select#query-field'), instanceQueryOptions);
    populateList($('ul#query-list'), $('#instance-query-options-storage').html());
    $('#query_common_and_cultivar').attr('disabled', true);
    return $('#query_common_and_cultivar_label').addClass('disabled');
  };

  window.setNameQueryOptions = function() {
    debug('setNameQueryOptions');
    populateSelect($('select#query-field'), nameQueryOptions);
    populateList($('ul#query-list'), $('#name-query-options-storage').html());
    $('#query_common_and_cultivar').removeAttr('disabled');
    return $('#query_common_and_cultivar_label').removeClass('disabled');
  };

  window.setReferenceQueryOptions = function() {
    debug('setReferenceQueryOptions');
    populateSelect($('select#query-field'), referenceQueryOptions);
    populateList($('ul#query-list'), $('#reference-query-options-storage').html());
    $('#query_common_and_cultivar').attr('disabled', true);
    return $('#query_common_and_cultivar_label').addClass('disabled');
  };

  window.setTreeQueryOptions = function() {
    var allowBlank;
    debug('setTreeQueryOptions');
    allowBlank = false;
    populateSelect($('select#query-field'), treeQueryOptions, allowBlank);
    // no tree query options here
    $('#query_common_and_cultivar').attr('disabled', true);
    return $('#query_common_and_cultivar_label').addClass('disabled');
  };

  window.populateSelect = function(select, options, allowBlank = true) {
    var display, results, value;
    select.empty();
    if (allowBlank) {
      select.append("<option value=''></option>");
    }
    results = [];
    for (value in options) {
      display = options[value];
      results.push(select.append(`<option value='${value}'>${display}</option>`));
    }
    return results;
  };

  populateList = function(unorderedList, newContent) {
    debug('populateList');
    unorderedList.html('');
    return unorderedList.html(newContent);
  };

  searchFieldChanged = function(event, $element) {
    debug('searchFieldChanged');
    if ($('#search-field').val().match(/authors*:/)) {
      $('select#query-on').val('author');
    }
    if ($('#search-field').val().match(/instances*:/)) {
      $('select#query-on').val('instance');
    }
    if ($('#search-field').val().match(/name.usages*:/)) {
      $('select#query-on').val('instance');
    }
    if ($('#search-field').val().match(/names*:/)) {
      $('select#query-on').val('name');
    }
    if ($('#search-field').val().match(/refs*:/)) {
      return $('select#query-on').val('reference');
    }
  };

  buildQueryString = function(event, $element) {
    var search_string;
    debug('BuildQueryString');
    search_string = '';
    if ($('#name-full-name').val() || $('#name-simple-name').val() || $('#name-name-element').val() || $('#name-name-type').val() || $('#name-name-author').val()) {
      search_string += 'name: ';
    }
    if ($('#name-full-name').val()) {
      search_string += ` fn: ${$('#name-full-name').val()} `;
    }
    if ($('#name-simple-name').val()) {
      search_string += ` sn: ${$('#name-simple-name').val()} `;
    }
    if ($('#name-name-author').val()) {
      search_string += ` na: ${$('#name-name-author').val()} `;
    }
    if ($('#name-name-type').val()) {
      search_string += ` nt: ${$('#name-name-type').val()} `;
    }
    if ($('#name-name-element').val()) {
      search_string += ` ne: ${$('#name-name-element').val()} `;
    }
    if (search_string.length > 0) {
      search_string += ";";
    }
    if ($('#reference-citation').val()) {
      search_string += ` ci: ${$('#reference-citation').val()} `;
    }
    if ($('#reference-year').val()) {
      search_string += ` y: ${$('#reference-year').val()} `;
    }
    if ($('#reference-parent-title').val()) {
      search_string += ` pt: ${$('#reference-parent-title').val()} `;
    }
    if ($('#author-name').val()) {
      search_string += ` an: ${$('#author-name').val()} `;
    }
    $('#search-field').val(search_string);
    return event.preventDefault();
  };

  instanceNoteKeyIdSelectChanged = function(event, $element) {
    var instanceNoteId;
    debug('instanceNoteKeyIdSelectChanged');
    instanceNoteId = $element.attr('data-instance-note-id');
    instanceNoteEnableOrDisableSaveButton(event, $element, instanceNoteId);
    return event.preventDefault();
  };

  // Disable save button if either mandatory field is empty.
  instanceNoteEnableOrDisableSaveButton = function(event, $element, instanceNoteId) {
    debug('instanceNoteEnableOrDisableSaveButton');
    if ($(`#instance-note-key-id-select-${instanceNoteId}`).val().length === 0 || $(`#instance-note-value-text-area-${instanceNoteId}`).val().length === 0) {
      $(`#instance-note-save-btn-${instanceNoteId}`).addClass('disabled');
    } else {
      $(`#instance-note-save-btn-${instanceNoteId}`).removeClass('disabled');
    }
    return event.preventDefault();
  };

  
  // Cancel editing for a specific instance note.
  cancelInstanceNoteEdit = function(event, $element) {
    var instanceNoteId;
    debug('cancelInstanceNoteEdit');
    instanceNoteId = $element.attr('data-instance-note-id');
    // Cancel the delete confirmation dialog if in progress.
    $(`a#instance-note-cancel-delete-link-${instanceNoteId}`).not('.hidden').click();
    // Throw the form away.
    $(`div#instance-note-edit-form-container-${$element.attr('data-instance-note-id')}`).text('');
    // Show the edit link.
    $(`#instance-note-edit-link-${instanceNoteId}`).removeClass('hidden');
    // Hide the cancel edit link.
    $(`#instance-note-cancel-edit-link-${instanceNoteId}`).addClass('hidden');
    // Hide the delete link.
    $(`#instance-note-delete-link-${instanceNoteId}`).addClass('hidden');
    // Enable the (hidden) delete link.
    $(`#instance-note-delete-link-${instanceNoteId}`).removeClass('disabled');
    // This doesn't this work: a delay occurs as a request is made to the server!
    //event.preventDefault()
    return false;
  };

  cancelDeleteInstanceNote = function(event, $element) {
    var instanceNoteId;
    debug('cancelDeleteInstanceNote');
    instanceNoteId = $element.attr('data-instance-note-id');
    debug(instanceNoteId);
    $(`#instance-note-delete-link-${instanceNoteId}`).removeClass('disabled');
    $element.parent().addClass('hidden');
    debug($element.parent().parent().children('span.delete').children('a.disabled').length);
    $element.parent().parent().children('span.delete').children('a.disabled').removeClass('disabled');
    $(`#${$element.attr('data-confirm-btn-id')}`).addClass('hidden');
    return event.preventDefault();
  };

  unconfirmedActionLinkClick = function(event, $element) {
    debug('unconfirmedActionLinkClick');
    $(`#${$element.attr('data-show-this-id')}`).removeClass('hidden');
    $element.addClass('disabled');
    $('.message-container').html('');
    return event.preventDefault();
  };

  cancelLinkClick = function(event, $element) {
    debug('cancelLinkClick');
    debug(`data-hide-this-id: ${$element.attr('data-hide-this-id')}`);
    debug(`data-enable-this-id: ${$element.attr('data-enable-this-id')}`);
    $(`#${$element.attr('data-hide-this-id')}`).addClass('hidden');
    $(`#${$element.attr('data-enable-this-id')}`).removeClass('disabled');
    $(`.${$element.attr('data-empty-this-class')}`).html('');
    $('.message-container').html('');
    $('.error-container').html('');
    return event.preventDefault();
  };

  deleteInstanceNote = function(event, $element) {
    var instanceNoteId;
    debug('deleteInstanceNote');
    instanceNoteId = $element.attr('data-instance-note-id');
    $(`#instance-note-delete-link-${instanceNoteId}`).addClass('disabled');
    $(`#confirm-or-cancel-delete-instance-note-${instanceNoteId}`).removeClass('hidden');
    return event.preventDefault();
  };

  clearQueryField = function(event, $element) {
    $('#search-field').val('');
    return event.preventDefault();
  };

  appendToQueryField = function(event, $element) {
    $('#search-field').val($('#search-field').val() + ' ' + $element.attr('data-value'));
    return event.preventDefault();
  };

  clickOnFocus = function(event, $element) {
    debug(`clickOnFocus: id: ${$element.attr('id')}; event target: ${event.target}`);
    return $element.click();
  };

  showFieldIsNotYetSaved = function($element) {
    $element.addClass('changed').addClass('not-saved');
  };

  window.loadTreeDetails = function(event, inFocus, tabWasClicked = false) {
    var instance_id, record_type, tabIndex, url;
    debug('window.loadTreeDetails');
    $('#search-result-details').show();
    $('#search-result-details').removeClass('hidden');
    record_type = 'instance'; //$('tr.showing-details').attr('data-record-type')
    tabIndex = 1; //$('.search-result.showing-details a[tabindex]').attr('tabindex')
    debug(`tabIndex: ${tabIndex}`);
    url = `${inFocus.attr('data-edit-url').replace(/0/, '')}${inFocus.attr('data-instance-id')}?tab=${currentActiveTab(record_type)}&tabIndex=${tabIndex}&rowType=${inFocus.attr('data-row-type')}`;
    debug(`url: ${url}`);
    $('#search-result-details').load(url, function() {
      debug("after get");
      recordCurrentActiveTab(record_type);
      if (tabWasClicked) {
        debug('tab clicked loadTreeDetails');
        if ($('.give-me-focus')) {
          debug('give-me-focus ing');
          return $('.give-me-focus').focus();
        } else {
          debug('just focus the tab');
          return $('li.active a.tab').focus();
        }
      }
    });
    return event.preventDefault();
  };

  changeNameCategoryOnEditTab = function(event, $this, tabWasClicked) {
    debug('changeNameCategoryOnEditTab');
    $('#search-result-details').load($this.attr('data-edit-url'));
    return event.preventDefault();
  };

  window.loadDetails = function(event, inFocus, tabWasClicked = false) {
    debug('window.loadDetails starting');
    return loadStandardDetails(event, inFocus, tabWasClicked);
  };

  window.loadStandardDetails = function(event, inFocus, tabWasClicked = false) {
    var err, instance_type, record_type, row_type, tabIndex, url;
    debug('window.loadStandardDetails starting');
    $('#search-result-details').show();
    $('#search-result-details').removeClass('hidden');
    record_type = $('tr.showing-details').attr('data-record-type');
    debug(`record_type: ${record_type}`);
    instance_type = $('tr.showing-details').attr('data-instance-type');
    debug(`instance_type: ${instance_type}`);
    row_type = $('tr.showing-details').attr('data-row-type');
    debug(`row_type: ${row_type}`);
    tabIndex = $('.search-result.showing-details a[tabindex]').attr('tabindex');
    try {
      url = inFocus.attr('data-tab-url').replace(/active_tab_goes_here/, currentActiveTab(record_type));
    } catch (error1) {
      err = error1;
      debug(err);
    }
    debug(`starting url: ${url}`);
    url = url + '?format=js&tabIndex=' + tabIndex;
    if (row_type != null) {
      url = url + '&row-type=' + row_type;
    }
    if (instance_type != null) {
      url = url + '&instance-type=' + instance_type;
    }
    if (inFocus.attr('data-row-type') != null) {
      url = url + '&rowType=' + inFocus.attr('data-row-type');
    }
    if (!!inFocus.attr('data-tree-element-operation')) {
      url = url + '&tree-element-operation=' + inFocus.attr('data-tree-element-operation');
    }
    if (!!inFocus.attr('data-tree-version-id')) {
      url = url + '&tree-version-id=' + inFocus.attr('data-tree-version-id');
    }
    if (!!inFocus.attr('data-tree-version-element-element-link')) {
      url = url + '&tree-version-element-element-link=' + inFocus.attr('data-tree-version-element-element-link');
    }
    if (!!inFocus.attr('data-tree-element-current-tve')) {
      url = url + '&tree-element-current-tve=' + inFocus.attr('data-tree-element-current-tve');
    }
    if (!!inFocus.attr('data-tree-element-previous-tve')) {
      url = url + '&tree-element-previous-tve=' + inFocus.attr('data-tree-element-previous-tve');
    }
    debug(`url: ${url}`);
    if (tabWasClicked) {
      url = url + '&take_focus=true';
    } else {
      url = url + '&take_focus=false';
    }
    debug(`loadStandardDetails url: ${url}`);
    $('#search-result-details').load(url, function() {
      recordCurrentActiveTab(record_type);
      if (tabWasClicked) {
        debug('tab was clicked loadStandardDetails');
        if ($('.give-me-focus')) {
          return debug('give-me-focus ing - changed so not .give-me-focus ing because clicked a tab resulted in focus switching to the first record');
        } else {
          $('.give-me-focus').focus()
          debug('just focus the tab');
          return $('li.active a.tab').focus();
        }
      } else {
        return debug('tab was not clicked');
      }
    });
    // $('li.active a.tab').focus()   ## new
    debug('loadStandardDetails after load url');
    return event.preventDefault();
  };

  currentActiveTab = function(record_type) {
    debug("state of " + record_type + ` tab: ${$('body').attr('data-active-' + record_type + '-tab')} via currentActiveTab`);
    return $('body').attr('data-active-' + record_type + '-tab');
  };

  recordCurrentActiveTab = function(record_type) {
    return $('body').attr('data-active-' + record_type + '-tab', $('div#search-result-details ul.nav-tabs li.active a').attr('data-tab-name'));
  };

  treeRowClicked2 = function(event, $this, data) {
    return debug('treeRowClicked2');
  };

  treeRowClicked = function(event, $this) {
    debug('treeRowClicked');
    if (!$this.hasClass('showing-details')) {
      changeTreeFocus(event, $this);
      $('#search-results.nothing-selected').removeClass('nothing-selected').addClass('something-selected');
    }
    return event.preventDefault();
  };

  searchResultFocus = function(event, $this) {
    debug('searchResultFocus starting from event: ' + event.type);
    $('#focus_id').val($this.find('a').attr('id'));
    if (!($this.hasClass('showing-details') || $this.hasClass('show-no-details'))) {
      debug('Changing focus: should show details');
      changeFocus(event, $this);
      $('#search-results.nothing-selected').removeClass('nothing-selected').addClass('something-selected');
      $('div#search-result-details').show();
    } 
    return event.preventDefault();
  };

  window.searchResultFocus = searchResultFocus;

  hideDetails = function(event, $this) {
    debug('Hiding details');
    $this.addClass('hidden');
    $('.showing-details').removeClass('showing-details');
    $('div#search-result-details').hide();
    $('#search-results.something-selected').removeClass('something-selected').addClass('nothing-selected');
    return event.preventDefault();
  };

  changeTreeFocus = function(event, inFocus) {
    debug(`changeTreeFocus: id: ${inFocus.attr('id')}; event target: ${event.target}`);
    $('.showing-details').removeClass('showing-details');
    inFocus.addClass('showing-details');
    loadTreeDetails(event, inFocus);
    return event.preventDefault();
  };

  changeFocus = function(event, inFocus) {
    debug(`changeFocus starting: id: ${inFocus.attr('id')}; event target: ${event.target}`);
    $('.showing-details').removeClass('showing-details');
    $('span.details-toggle').addClass('hidden');
    inFocus.addClass('showing-details');
    loadDetails(event, inFocus);
    inFocus.find('span.details-toggle.hidden').removeClass('hidden');
    return event.preventDefault();
  };

  searchResultKeyNavigation = function(event, $this) {
    var arrowDown, arrowLeft, arrowRight, arrowUp, keep_going;
    debug('searchResultKeyNavigation start');
    arrowLeft = 37;
    arrowRight = 39;
    arrowUp = 38;
    arrowDown = 40;
    keep_going = false;
    switch (event.keyCode) {
      case arrowLeft:
        moveToSearchResultDetails($this, 'last');
        break;
      case arrowRight:
        moveToSearchResultDetails($this, 'first');
        break;
      case arrowUp:
        moveUpOneSearchResult($this);
        break;
      case arrowDown:
        moveDownOneSearchResult($this);
        break;
      default:
        keep_going = true;
    }
    if (!keep_going) {
      return event.preventDefault();
    }
  };
  window.searchResultKeyNavigation = searchResultKeyNavigation;

  reviewResultKeyNavigation = function(event, $this) {
    var arrowDown, arrowLeft, arrowRight, arrowUp, keep_going;
    debug('reviewResultKeyNavigation ');
    arrowLeft = 37;
    arrowRight = 39;
    arrowUp = 38;
    arrowDown = 40;
    keep_going = false;
    switch (event.keyCode) {
      case arrowLeft:
        moveToSearchResultDetails($this, 'last');
        break;
      case arrowRight:
        moveToSearchResultDetails($this, 'first');
        break;
      case arrowUp:
        moveUpOneReviewResult($this);
        break;
      case arrowDown:
        moveDownOneReviewResult($this);
        break;
      default:
        keep_going = true;
    }
    if (!keep_going) {
      return event.preventDefault();
    }
  };

  clickSearchResultCB = function(event, $this) {
    debug('clickSearchResultCB');
    if ($this.hasClass('stylish-checkbox-checked')) {
      unCheckSearchResultCB(event, $this);
    } else {
      checkSearchResultCB(event, $this);
    }
    return event.preventDefault();
  };

  unCheckSearchResultCB = function(event, $this) {
    debug('unCheckSearchResultCB');
    return $this.removeClass('stylish-checkbox-checked').addClass('stylish-checkbox-unchecked');
  };

  checkSearchResultCB = function(event, $this) {
    debug('checkSearchResultCB');
    return $this.removeClass('stylish-checkbox-unchecked').addClass('stylish-checkbox-checked');
  };

  searchResultRecordType = function() {
    debug(searchResultRecordType());
    debug($('#search-results tr.search-result .stylish-checkbox-checked').length);
    return $('#search-results tr.search-result .stylish-checkbox-checked').closest('tr').attr('data-record-type');
  };

  window.showMessage = function(message) {
    debug('showMessage');
    $('#message-container').removeClass('hidden').addClass('visible').html(message);
    return setOneClickHider($('#message-container'));
  };

  window.setOneClickHider = function($target) {
    return $(document).one("click", function(event) {
      return hidePopupOrAddHider(event, $target);
    });
  };

  // For the "click anywhere outside popup to hide popup" feature.
  // This function gets called in the document click anywhere event.
  // The aim of that event is to hide the current popup.
  // There is a side-effect because that event fires even if the click is in the popup itself,
  // which we don't want to hide.
  // This fn defuses that case:  if click is in popup, do not hide popup.
  // There is a further complication because the hider is bound via "one", 
  // so when this function is called you will have consumed that "one" event, so 
  // you have to reset the one-off event.

  // Now, also restore title from data-title attribute.
  hidePopupOrAddHider = function(event, $target) {
    if ($(event.target).closest('.popup').length === 0) {
      return closeOpenPopups();
    } else {
      return setOneClickHider($target);
    }
  };

  closeOpenPopups = function() {
    return $('.popup').removeClass('visible').addClass('hidden');
  };

  positionOnTheRight = function(clickPosition, $target, offset) {
    $target.css('left', clickPosition.left + offset);
    return $target.css('top', clickPosition.top);
  };

  makeTargetVisible = function($target) {
    debug(`makeTargetVisible: ${$target.attr('id')}`);
    return $target.removeClass('hidden').addClass('visible');
  };

  makeTargetInvisible = function($target) {
    return $target.removeClass('visible').addClass('hidden');
  };

  toggleVisibleHidden = function($target) {
    if ($target.hasClass('hidden')) {
      return makeTargetVisible($target);
    } else {
      return makeTargetInvisible($target);
    }
  };

  window.moveUpOneSearchResult = function(startRow) {
    return startRow.prev().find('a.show-details-link').focus();
  };

  window.moveDownOneSearchResult = function(startRow) {
    return startRow.next().find('a.show-details-link').focus();
  }

  window.moveUpOneReviewResult = function(row) {
    if (row.prev()) {
      if (row.prev().find('a.navigation-link').length === 1) {
        return row.prev().find('a.navigation-link').focus();
      } else {
        // skip white-space boundary row
        return row.prev().prev().find('a.navigation-link').focus();
      }
    }
  };

  window.moveDownOneReviewResult = function(row) {
    if (row.next().find('a.navigation-link').length === 1) {
      return row.next().find('a.navigation-link').focus();
    } else {
      // skip white-space boundary row
      return row.next().next().find('a.navigation-link').focus();
    }
  };

  window.moveToSearchResultDetails = function(searchResultDetail, liElementHasClass) {
    return $('#search-result-details ul li.' + liElementHasClass + ' a').focus();
  };

  loaderBulkShowStatsClicked = function(event, $the_element) {
    $('#bulk-ops-stats-container').html("<br><span class='green'>Querying stats...</span><br><br><br>");
    $('#bulk-ops-stats-container').removeClass('hidden');
  };

  window.addNewRow = function(at_index, for_id, randomId, dataTabUrl) {
  // Get a reference to the table
  let tableRef = document.getElementById('search-results-table');
  let newRow = tableRef.insertRow(at_index + 1);
  $(newRow).attr('id', 'new-loader-name-'+randomId);
  $(newRow).addClass('new-record').addClass('new-loader-name').addClass('search-result').addClass('show-details');

  $(newRow).attr('data-record-type', 'loader-name');
  $(newRow).attr('data-record-id', for_id.toString());

  let tabUrl = dataTabUrl
  tabUrl = tabUrl.replace(/7007007007007007/,for_id);
  $(newRow).attr('data-tab-url', tabUrl);
  $(newRow).attr('data-edit-url', tabUrl);

  $(newRow).attr('tabindex', '3000');

  // Insert a cell in the row at index 0
  let firstCell = newRow.insertCell(0);
  $(firstCell).addClass('nsl-tiny-icon-container').addClass('takes-focus width-1-percent');

  let secondCell = newRow.insertCell(1);
  $(secondCell).addClass('text').addClass('takes-focus').addClass('name');
  $(secondCell).addClass('main-content').addClass('give-me-focus');
  $(secondCell).addClass('min-width-40-percent').addClass('max-width-100-percent').addClass('width-90-percent');
  // Append a text node to the cell
  let label = document.createTextNode('New Accepted or Excluded Loader Name');
  let link = document.createElement('a');
  $(link).addClass('show-details-link');
  $(link).attr('title','New loader name record. Select to see details');
  $(link).attr('tabindex','1000');
  link.appendChild(label)
  secondCell.appendChild(link);
  };


}).call(this);
