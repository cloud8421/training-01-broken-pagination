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

