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

