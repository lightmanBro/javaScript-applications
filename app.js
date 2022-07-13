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

                   totals : {
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
                             } else {ID = 0};

                             // create a new item based on inc or exp type
                              if (type === 'exp') {
                              newItem = new Expenses(ID, des, val);
                              } else if (type === 'inc') {
                              newItem = new Income(ID, des, val);
                              }

                             // after creating the new items then we need to store it inside our data structure using this array method
                             // push the new item created into our data structure with the variable name newItem
                             data.allItems[type].push(newItem);

                             // return the new element
                             return newItem; // so that other modules can have acess to add a new item to the budgetcontroller.
                    },

                    testing: function() {
                              console.log(data);
                    }
          }
} )();


// UI CONTROLLER
var UIcontroller = (function(){

          var DOMstrings = {
                    inputType: '.add__type',
                    inputDescription: '.add__description',
                    inputValue : '.add__value',
                    // buttons from the down modules
                    inputBtn : '.add__btn',
                    incomeContainer: '.income__list',
                    expensesContainer: '.expenses__list'

          }

          return {
                    // getting values from HTML input fields
                    getinput: function(){
                              return {
                                        type : document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                                        description : document.querySelector(DOMstrings.inputDescription).value,
                                        value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
                                        // these values will be returned by returning an object that contains the three properties e.g getinput.type... etc.
                              };
                             
                    },

                    addListItem: function(obj, type) {
                              var html, newHtml, element;
                              // create HTML string with placeholder text.
                              if (type === 'inc') {
                              element = DOMstrings.incomeContainer;
                               html = '<div class="item clearfix" id=income-"%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                              }
                               else if (type === 'exp')
                             { element = DOMstrings.expensesContainer;
                              html = '<div class="item clearfix" id=expense-"%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';}

                              // replace the placeholder text with some actual data that we receive from the object.
                              newHtml = html.replace('%id%', obj.id);
                              newHtml = newHtml.replace('%description%', obj.description);
                              newHtml = newHtml.replace('%value%', obj.value);
                              
                              // then insert the HTML into the DOM.
                              document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


                    },

                    clesarFields: function() {
                              var fields;
                        fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
                        // the queryselectorAll method returns what its used to select as a list rather than an array. A list is a bit similar to an Array but it does not have all the methods that an array has, so the solution is for us to convert the list to an array with the array method called slice() and what a slice does is to returned a copy of the array that it is called on. so we are tricking the method by passig a list into it so that it will still retunr an array.
                        fieldsArr = Array.prototype.slice.call(fields);

                        fieldsArr.forEach(function(current, index, array) { current.value = '';
                              
                        });
                        // setting the focus back to the input description field
                        fieldsArr[0].focus();
                    },
                    // Exposing domstrings object to the public so that the below module can have an access to its properties.
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
                             };
         
                    });
          };

          var updateBudget = function() {

                    //1. Calculate the budget

                    //2. return the budget

                    //3. Display the budget on the UI
          }
          

          // when the add button is pressed this should happen
          var ctrlAddItem = function() {
                    var input, newItem;

                    //1. Get the field input data
                    input = UIcontroller.getinput(); 


                    // EVERYTHING INSIDE THIS STATEMENT SHOULD ONLY HAPPEN IF THE CONDITIONS INSIDE THE CODEBLOCK IS MET
                    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
                              //2. Add the item to the budget controller
                    // from the budgetcontroller module where the addItem method was created it was supposed to take 3 parameters and the data of the parameter are inside the budgetcontroller module but extended to this module and kept inside the (input) variable so from the input variable we can have an acess to the values.
                    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                    //3. Add the item to the UI
                    UIctrl.addListItem(newItem, input.type);

                    //4. Clear the fields
                    UIctrl.clesarFields()

                    //5. Calculate and update budget
                    updateBudget();
                    }
                    
          };
          return {
                    init : function() {
                              console.log('application has started');
                              setuupEventListeners();
                    }
          };

})(budgetrController, UIcontroller);

controller.init();