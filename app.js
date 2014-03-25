(function() {
  var contacts = new Contacts();
  contacts.done(function(data) {
    var contactsView = new ContactsView(data, $('#contacts tbody'), $('#contact-template'));
    contactsView.render();
    new PaginatorView($('#pagination'), contactsView);
  });
})();
