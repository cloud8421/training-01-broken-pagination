(function() {

  var Contacts = function() {
    var url = '/contacts.json';
    return $.getJSON(url);
  }

  var Paginator = function(collection, perPage) {
    this.collection = collection;
    this.perPage = perPage;
    this.currentPageIndex = 0;

    this.total = collection.length;
    this.totalPages = Math.ceil(this.total/this.perPage);

    this.currentPage = function() {
      var lowerLimit = this.currentPageIndex * this.perPage;
      var upperLimit = lowerLimit + this.perPage;
      return collection.slice(lowerLimit, upperLimit);
    }
  }

  var ContactsView = function(collection, container, template) {
    this.collection = collection;
    this.container = container;
    this.paginator = new Paginator(collection, 10);
    this.template = template.html();

    this.render = function() {
      this.container.empty();
      this.paginator.currentPage().forEach(function(contact) {
        var contactFragment = Mustache.render(this.template, contact);
        this.container.append(contactFragment);
      }, this);
    }

    this.nextPage = function() {
      this.paginator.currentPageIndex += 1;
      this.render();
    }

    this.prevPage = function() {
      this.paginator.currentPageIndex -= 1;
      this.render();
    }
  }

  var PaginatorView = function(container, targetView) {
    container
      .on('click', 'a[href="#next"]', function(evt) {
        evt.preventDefault();
        targetView.nextPage();
      })
      .on('click', 'a[href="#prev"]', function(evt) {
        evt.preventDefault();
        targetView.prevPage();
      });
  };

  var contacts = new Contacts();
  contacts.done(function(data) {
    var contactsView = new ContactsView(data, $('#contacts tbody'), $('#contact-template'));
    contactsView.render();
    new PaginatorView($('#pagination'), contactsView);
  });
})();
