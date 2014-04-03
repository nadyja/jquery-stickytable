/*
 * stickytable
 * 
 *
 * Copyright (c) 2014 Nadia Miętkiewicz
 * Licensed under the MIT license.
 */

/* 
TODO:
* warunki
* porzadek w funkcjach pomocniczych
* css inject
* testy i build 
*/
(function ($) {
  $.fn.stickytable = function (options) {
    options = $.extend($.stickytable.options, options);

    return this.each(function () {
      $(this)
        .wrap('<div class="stickytable-wrapper"></div>')
        .wrap('<div class="stickytable-inner"></div>');

      var inner=$(this).closest('.stickytable-inner');
      // inner.height($.stickytable.options.height);
      var wrapper=$(this).closest('.stickytable-wrapper');
      wrapper.prepend('<table class="stickytable-header"></table>');
      wrapper.append('<table class="stickytable-footer"></table>');
      $('.stickytable-header',wrapper)
        .append($(this).find('thead').detach()) 
        .addClass($(this).attr('class'))
        .find('tr').append('<td class="td-scrollplaceholder"></td>');
      $('.stickytable-footer',wrapper)
        .append($(this).find('tfoot').detach())
        .addClass($(this).attr('class'))
        .find('tr').append('<td class="td-scrollplaceholder"></td>');
      $(inner).scrollTop($(inner)[0].scrollHeight);
      wrapper.css({
        'paddingTop': wrapper.find('.stickytable-header').height(),
        'paddingBottom': wrapper.find('.stickytable-footer').height()
      });

      $.resize();
      $('table',inner).bind("DOMSubtreeModified",function(){     
         $.resize();
      });
      $(window).resize(function() {
        $.resize();
      });


    });

  };

$.resize=function() {
  $.resizeVertical();
  $.resizeColumns();     
  $.resizeScrollbar();
 
};

$.resizeVertical=function() {
    $('.stickytable-wrapper').each(function() {
      var wrapper=$(this);
      var inner=$('.stickytable-inner',wrapper);
      var height = $(window).height();
      var stickypadding=wrapper.innerHeight()-wrapper.height();
      var top=wrapper.offset().top; 
      var h=height-top-stickypadding-25;
      wrapper.height(h);
      inner.scrollTop($(inner)[0].scrollHeight);
  });
};

$.resizeScrollbar = function() {
  $('.stickytable-inner').each( function() {
    var inner=$(this);
    var scrollwidth=inner.innerWidth()-$('table',inner).innerWidth();
    if(scrollwidth<=2) { $('.td-scrollplaceholder').hide();}
    else {
      $('.td-scrollplaceholder').css({'width': scrollwidth+'px'}).show();
      }
    //console.log('resizeScrollbar: '+scrollwidth);      
    });
  };


$.resizeColumns = function() {
  $('.stickytable-wrapper').each(function() {
    var wrapper=$(this);
    var realRow=$('.stickytable-inner table tbody tr:first-child');
    $('thead,tfoot',wrapper).find('tr').each(function() {
      var debugWidths="";
      $('td',this).each(function (i) {
        var stickyColumn=$(this);
        var realColumn=$('td:nth-child('+(i+1)+')',realRow);
        var columnWidth=realColumn.outerWidth();
        if(columnWidth) {
          debugWidths+=columnWidth+" ";
          stickyColumn.css({'width': columnWidth+"px"});  
        }
        });
      //console.log('resizeColumns: '+debugWidths);      
    });
});
};



  // Static method.
  $.stickytable = function (options) {
    // Override default options with passed-in options.
    options = $.extend($.stickytable.options, options);
    // Return something stickytable.
    return 'stickytable' + options.height;
  };

  // Static method default options.
  $.stickytable.options = {
    height: 'auto',
    headerstick: true,
    footerstick: true
  };

  // Custom selector.
  $.expr[':'].stickytable = function (elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('stickytable') !== -1;
  };

}(jQuery)); 

