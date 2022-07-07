// BUDGET CONTROLLER
var budgetrController = (function(){

          class Expenses {
                    constructor(id, description, value) {
                              this.id = id;
                              this.description = description;
                              this.value = value;
                              // if any method is needed then the methods will be put in the prototype of the Expense.
                    }
          }

          class Income {
                    constructor(id, description, value) {
                              this.id = id;
                              this.description = description;
                              this.value = value;
                              // if any method is needed then the methods will be put in the prototype of the Income.
                    }
          }

          var data = {
                    // this is where all of the data of both income and expenses is stored.
                    allItems: {
                    exp: [],
                    inc: []
                    },

                   total : {
                    exp: 0,
                    inc: 0
                   }
          };

          // public method that will allow other modules to add a new items to the budget controller.
          return {  
                    // function to add a new item into this module by other modules.
                    addItem: function(type, des, val) {

                              var newItem, ID;
                             // a unique number that we want to assign to a new item created which the new item will be the last item inside the array plus the new item added.
                             if (data.allItems[type].length > 0) {
                              ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                             } else {
                              ID = 0};
                             

                             // create a new item based on inc or exp type
                              if (type === 'exp') {
                              newItem = new Expenses(ID, des, val);
                              } else if (type === 'inc') {
                              newItem = new Income(ID, des, val);
                              }

                             // after creating the new items then we need to store it inside our data structure using this array method

                             // push the new item created into our data structure
                             data.allItems[type].push(newItem);

                             // return the new element
                             return newItem; // so that other modules can have acess to add a new item to the budgetcontroller.
                    },

                    testing: function() {
                              console.log(data);
                    }
          }


} )();

class Expenses {
          constructor(id, description, value) {
                    this.id = id;
                    this.description = description;
                    this.value = value;
                    // if any method is needed then the methods will be put in the prototype of the Expense.
          }
}

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

          var setuupEventListeners = function() {
                    // passing the domstrings from the UIctrl.getdomstrings() module to this module and storing it as a local variale (DOM) so that everything in it can be accessed by this module controller.
                    var DOM = UIctrl.getDomstrings();


                    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
                    //for keypress events that happens when someone presses the enter key on the global document not on a specific element.
                    document.addEventListener('keypress', function(event) {
                             if (event.key === 13 || event.which === 13){
                                       ctrlAddItem();
                             }
         
                    });
          }
          

          // when the add button is pressed this should happen
          var ctrlAddItem = function() {
                    var input, newItem;

                    //1. Get the field input data
                    input = UIcontroller.getinput(); 

                    //2. Add the item to the budget controller
                    // from the budgetcontroller module where the addItem method was created it was supposed to take 3 parameters and the data of the parameter are inside the budgetcontroller module but extended to this module and kept inside the (input) variable so from the input variable we can have an acess to the values.
                    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                    //3. Add the item to the UI

                    //4. Calculate the budget

                    //5. Display the budget to the UI
          }
          return {
                    init : function() {
                              console.log('application has started');
                              setuupEventListeners();
                    }
          };

})(budgetrController, UIcontroller);

controller.init();