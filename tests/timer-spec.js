describe('game-timer', function(){

  var timer;

  beforeEach(function(){
    timer = new Timer();
  });

  describe('constructor', function(){
    it('should initialize an id property to 0', function(){
      expect(timer.id).toBe(0);
    });
    it('should initialize a map property to a default object', function(){
      expect(timer.map).toBeDefined();
      expect(typeof timer.map).toBe('object');
      expect(Object.keys(timer.map).length).toBe(0);
    });
  });

  describe('clearInterval', function(){
    it('should remove an existing entry', function(){
      var id = '--id--';
      timer.map[id] = {};

      timer.clearInterval(id);
      expect(timer.map[id]).not.toBeDefined();
    });
  });

  describe('clearTimeout', function(){
    it('should remove an existing entry', function(){
      var id = '--another-id--';
      timer.map[id] = {};

      timer.clearTimeout(id);
      expect(timer.map[id]).not.toBeDefined();
    });
  });

  describe('setInterval', function(){
    it('should increment the id', function(){
      timer.setInterval('','');
      expect(timer.id).toBe(1);
      timer.setInterval('','');
      expect(timer.id).toBe(2);
      timer.setInterval('','');
      expect(timer.id).toBe(3);
    });

    it('should return the id', function(){
      var id = timer.setInterval('','');
      expect(id).toBe(1);
      id = timer.setInterval('','');
      expect(id).toBe(2);
      id = timer.setInterval('','');
      expect(id).toBe(3);
    });

    it('should create an entry in the map at the new id', function(){
      var id = timer.setInterval('','');
      var entry = timer.map[id];
      expect(entry).toBeDefined();
    });

    it('should store it\'s arguments in an array in the map', function(){
      var func = '--func--';
      var interval = '--interval--';
      var id = timer.setInterval(func, interval);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[0]).toBe(func);
      expect(entry[1]).toBe(interval);
    });

    it('should store a zero as third element in the array', function(){
      var func = '--func--';
      var interval = '--interval--';
      var id = timer.setInterval(func, interval);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[2]).toBe(0);
    });

    it('should store `true` as fourth element in the array', function(){
      var func = '--func--';
      var interval = '--interval--';
      var id = timer.setInterval(func, interval);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[3]).toBe(true);
    });

    it('should not bind the callback if no third argument is given', function(){
      var func = function(){};
      var bind = spyOn(func, 'bind');
      var interval = '--interval--';
      var id = timer.setInterval(func, interval);
      expect(bind).not.toHaveBeenCalled();
    });

    it('should bind the callback if third argument is given', function(){
      var func = function(){};
      var bind = spyOn(func, 'bind');
      var interval = '--interval--';
      var ctx = '--context--';
      var id = timer.setInterval(func, interval, ctx);
      expect(bind).toHaveBeenCalledWith(ctx);
    });

    it('should store the bound callback if third argument is given', function(){
      var func = function(){};
      var boundFunc = '--bound-func--';
      var bind = spyOn(func, 'bind').andReturn(boundFunc);
      var interval = '--interval--';
      var ctx = '--context--';
      var id = timer.setInterval(func, interval, ctx);
      var entry = timer.map[id];
      expect(entry[0]).toBe(boundFunc);
    });
  });

  describe('setTimeout', function(){
    it('should increment the id', function(){
      timer.setTimeout('','');
      expect(timer.id).toBe(1);
      timer.setTimeout('','');
      expect(timer.id).toBe(2);
      timer.setTimeout('','');
      expect(timer.id).toBe(3);
    });

    it('should return the id', function(){
      var id = timer.setTimeout('','');
      expect(id).toBe(1);
      id = timer.setTimeout('','');
      expect(id).toBe(2);
      id = timer.setTimeout('','');
      expect(id).toBe(3);
    });

    it('should create an entry in the map at the new id', function(){
      var id = timer.setTimeout('','');
      var entry = timer.map[id];
      expect(entry).toBeDefined();
    });

    it('should store it\'s arguments in an array in the map', function(){
      var func = '--func--';
      var timeout = '--timeout--';
      var id = timer.setTimeout(func, timeout);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[0]).toBe(func);
      expect(entry[1]).toBe(timeout);
    });

    it('should store a zero as third element in the array', function(){
      var func = '--func--';
      var timeout = '--timeout--';
      var id = timer.setTimeout(func, timeout);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[2]).toBe(0);
    });

    it('should not store `true` as fourth element in the array', function(){
      var func = '--func--';
      var timeout = '--timeout--';
      var id = timer.setTimeout(func, timeout);
      var entry = timer.map[id];
      expect(entry).toBeDefined();
      expect(entry[3]).not.toBeDefined();
    });

    it('should not bind the callback if no third argument is given', function(){
      var func = function(){};
      var bind = spyOn(func, 'bind');
      var timeout = '--timeout--';
      var id = timer.setTimeout(func, timeout);
      expect(bind).not.toHaveBeenCalled();
    });

    it('should bind the callback if third argument is given', function(){
      var func = function(){};
      var bind = spyOn(func, 'bind');
      var timeout = '--timeout--';
      var ctx = '--context--';
      var id = timer.setTimeout(func, timeout, ctx);
      expect(bind).toHaveBeenCalledWith(ctx);
    });

    it('should store the bound callback if third argument is given', function(){
      var func = function(){};
      var boundFunc = '--bound-func--';
      var bind = spyOn(func, 'bind').andReturn(boundFunc);
      var timeout = '--timeout--';
      var ctx = '--context--';
      var id = timer.setTimeout(func, timeout, ctx);
      var entry = timer.map[id];
      expect(entry[0]).toBe(boundFunc);
    });
  });

  describe('update', function(){

    var callbacks, foo, bar;
    beforeEach(function(){
      callbacks = {
        foo: function(){},
        bar: function(){}
      };
      foo = spyOn(callbacks, 'foo');
      bar = spyOn(callbacks, 'bar');
    });

    it('should increase the elapsed time portion of an entry by given delta', function(){
      var id = timer.setInterval('', 1000);
      var delta = 123;
      timer.update(delta);
      var entry = timer.map[id];
      expect(entry[2]).toBe(delta);
    });

    it('should increase the elapsed time portion of all entries by given delta', function(){
      var first_id = timer.setInterval('', 1000);
      var second_id = timer.setTimeout('', 2000);
      var delta = 456;
      timer.update(delta);
      var entry = timer.map[first_id];
      expect(entry[2]).toBe(delta);
      entry = timer.map[second_id];
      expect(entry[2]).toBe(delta);
    });

    it('should fire the callback if elapsed time is equal to the assigned time', function(){
      timer.setTimeout(foo, 100);
      timer.update(100);
      expect(foo).toHaveBeenCalled();
    });

    it('should fire the callback if elapsed time is larger than the assigned time', function(){
      timer.setTimeout(foo, 100);
      timer.update(101);
      expect(foo).toHaveBeenCalled();
    });

    it('should delete the entry if it is a timeout and elapsed > assigned', function(){
      var id = timer.setTimeout(foo, 100);
      timer.update(101);
      expect(timer.map[id]).not.toBeDefined();
    });

    it('should subtract assigned from elapsed if it is an interval and elapsed > assigned', function(){
      var id = timer.setInterval(foo, 100);
      timer.update(123);
      expect(timer.map[id][2]).toBe(23);
    });

  });

});
