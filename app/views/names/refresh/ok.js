$('.message-container').html('');
$('#name-refresh-info-message-container').html('Name refreshed');
$('#cancel-refresh-link').addClass('disabled');
$('#name-refresh-link').removeClass('disabled');
$('#confirm-or-cancel-refresh-link-container').addClass('hidden');
$('a#name-<%= @name.id %>').html('<%= escape_javascript(render partial: 'name_link_text', locals: {search_result: @name}) %>');
$('a#tab-heading').html('<%= @name.full_name %>');

