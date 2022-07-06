// BUDGET CONTROLLER
var budgetrController = (function(){

} )();

// UI CONTROLLER
var UIcontroller = (function(){

          var DOMstrings = {
                    inputType: '.add__type',
                    inputDescription: '.add__description',
                    inputValue : '.add__value',
                    // buttons for the down modules
                    inputBtn : '.add__btn',

          }

          return {
                    // getting values from HTML input fields
                    getinput: function(){
                              return {
                                        type : document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                                        description : document.querySelector(DOMstrings.inputDescription).value,
                                        value : document.querySelector(DOMstrings.inputValue).value
                                        // these values will be returned by returning an object that contains the three properties e.g getinput.type... etc.
                              };
                             
                    },
                    // Exposing domstrings into the public
                    getDomstrings: function(){
                              return DOMstrings;
                    }
          }

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UIctrl){
// this is where to control what happens upon each events and delegate the tasks to the other controllers.

          // passing the domstrings from the UIctrl module to this module and storing it as a local variale DOM so that everything in it can be accessed by this module.
          var DOM = UIctrl.getDomstrings();


          // when the add button is pressed this should happen
          var ctrlAddItem = function() {
                    //1. Get the field input data
                    var input = UIcontroller.getinput();
                    console.log(input)
                    //2. Add the item to the budget controller

                    //3. Add the item to the UI

                    //4. Calculate the budget

                    //5. Display the budget to the UI
          }
           document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

           //for keypress events that happens when someone presses the enter key on the global document not on a specific element.
           document.addEventListener('keypress', function(event) {
                    if (event.key === 13 || event.which === 13){
                              ctrlAddItem();
                    }

           });

})(budgetrController, UIcontroller );