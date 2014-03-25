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
