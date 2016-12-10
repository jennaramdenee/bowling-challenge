describe("Frame", function(){

  var frame;

  beforeEach(function(){
    frame = new Frame();
  })

  describe("Creation", function(){
    it("sets a maximum of 10 points", function(){
      expect(frame.MAX_POINTS).toEqual(10);
    })
    it("sets a maximum value of 2 rolls", function(){
      expect(frame.MAX_ROLLS).toEqual(2);
    })
    it("sets an initial roll count of 0", function(){
      expect(frame.rollCount).toEqual(0);
    })
    it("sets an initial score of 0", function(){
      expect(frame.score).toEqual(0);
    })
  })

  describe("Scores", function(){
    it("can be randomized per roll", function(){
      expect(frame.calculateRollScore()).toBeGreaterThan(-1);
      expect(frame.calculateRollScore()).not.toBeGreaterThan(10);
    })
    it("can be added per roll", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(4);
      frame.roll();
      expect(frame.score).toEqual(4);
    })
    it("cannot exceed 10", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(10);
      frame.roll();
      expect(function(){frame.roll();}).toThrow("Frame is over");
    })
  })

  describe("Roll", function(){
    it("count increases by 1 when a roll is taken", function(){
      frame.roll();
      expect(frame.rollCount).toEqual(1);
    })
    it("count cannot exceed 2", function(){
      for(var i = 0; i<2; i++){ frame.roll(); }
      expect(function(){frame.roll();}).toThrow("Frame is over");
    })
  })

  describe("End", function(){
    it("can indicate a frame is over when 10 points has been reached", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(10);
      frame.roll();
      expect(frame.hasEnded()).toEqual(true);
    })
    it("can indicate a frame is over when 2 rolls have been taken", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(4);
      for(var i = 0; i<2; i++){ frame.roll(); }
      expect(frame.hasEnded()).toEqual(true);
    })
    it("can indicate a frame is not over when 1 roll has been taken", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(6);
      frame.roll();
      expect(frame.hasEnded()).toEqual(false);
    })
    it("can indicate a frame is not over when 6 points has been reached in 1 roll", function(){
      spyOn(frame, "calculateRollScore").and.returnValue(6);
      frame.roll();
      expect(frame.hasEnded()).toEqual(false);
    })
  })








})
