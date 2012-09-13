(function ($) {
  'use strict';

  //global variables
  var $document = $(document);

  $.fn.grid960 = function (options) {

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend({
      columns: 12,
      gutter: 20,
      row: 25
    }, options);

    var gridWidth = 960;
    var columnCount = settings.columns;
    var gutterWidth = settings.gutter;
    var columnWidth = gridWidth / columnCount - gutterWidth;
    var rowHeight = settings.row;

    var gridWrapper = '<div id="grid_wrapper" />';
    var gridColumn = '<div class="grid_column" />';
    var gridRow = '<div class="grid_row" />';

    var documentHeight = $document.height();
    var rowCount = parseInt((documentHeight / rowHeight), 10);

    this.append(gridWrapper);

    var grid = $('#grid_wrapper');

    grid.css({
      display: 'none',
      position: 'absolute',
      left: '50%',
      top: 0,
      marginLeft: gridWidth * -0.5,
      height: documentHeight,
      width: gridWidth,
      pointerEvents: 'none',
      outline: '2px solid rgba(0,0,0,0.1)'
    });

    var i;
    for(i = 1; i <= columnCount; i++) {
      grid.append(gridColumn);
    }
    for(i = 1; i <= rowCount; i++) {
      grid.append(gridRow);
    }

    var gridColumns = $('.grid_column');
    var gridRows = $('.grid_row');
    var columnMargin = gutterWidth / 2;

    gridColumns.each(function () {
      var $this = $(this);
      var index = $this.index() + 1;
      $this.addClass('col-' + index);
    });

    for(i = 1; i <= columnCount; i++) {
      var width = gridWidth / columnCount;
      $('.col-' + i).css({
        left: i * width - width
      });
    }

    gridColumns.css({
      position: 'absolute',
      top: 0,
      width: columnWidth,
      height: '100%',
      marginLeft: columnMargin,
      marginRight: columnMargin,
      backgroundColor: '#a7a7a7',
      opacity: '0.2'

    });

    gridRows.css({
      position: 'relative',
      width: "100%",
      height: rowHeight - 1,
      borderBottom: '1px solid #000',
      opacity: '0.2'
    });


    var firstKey = false;

    $document.keyup(function (e) {
      if(e.which === 18) {
        firstKey = false;
      }
    }).keydown(function (e) {
      if(e.which === 18) {
        firstKey = true;
      }
      if(e.which === 71 && firstKey === true) {
        grid.toggle();
      }
    });

  };
}(jQuery));