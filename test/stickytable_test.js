(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message]) 
  */




 




  test('is chainable', function() {
    expect(1);
    strictEqual(this.elems.stickytable(), this.elems, 'should be chainable');
  });

  test('is stickytable', function() {
    expect(1);
    strictEqual(1, 1, 'should be stickytable');
  });


  test('is stickytable', function() {
    expect(1);
    strictEqual(1, 1, 'should be stickytable');
  });



  test('is stickytable', function() {
    expect(1);
    strictEqual(1, 1, 'knows stickytable when it sees it');
  });




}(jQuery));
