# Angular Style Bindings

The module is not yet optimized but it is very flexible and powerful.

Here you can see some use cases: 

* [Move and resize Modal][plkr]
* [Move, resize and change color][plkr2]
* [Multi split panes][plkr3]
* [Sliders][plkr4]

[plkr]: http://plnkr.co/edit/mgCfrpwAzTRJUIO3Gqv4?p=preview
[plkr2]: http://plnkr.co/edit/9Z8JbQDszvoM96TyyoFh?p=preview
[plkr3]: http://plnkr.co/edit/7ZAY9L?p=preview
[plkr4]: http://plnkr.co/edit/ZVjB7z?p=preview

## Getting Started

In your web page:

```html
<script src="angular.js"></script>
<script src="angular-style-bindings.min.js"></script>
```

As soon as you've got all the files downloaded and included in your page you just need to declare a dependency on the qantic.angularjs.stylemodel module:

```javascript
angular.module('myModule', ['angular.style.bindings']);
```

Now you are ready to configure and use the module.

Add some models to the StyleModelContainer and then for every model define the styles associated to that model. Every style will have a transform function that receives x and y offsets from the press point and returns a style object.
```javascript
app.controller('MainCtrl', function($scope, StyleModelContainer) {

   $scope.name = 'World';
   $scope.styleModelContainer = StyleModelContainer;
  
   $scope.styleModelContainer.add('modal-pos', 
                                  -Infinity, Infinity, 
                                   0, Infinity,
                                   20, 20);
   $scope.styleModelContainer.add('modal-size',
                                   250, Infinity,
                                   100, Infinity,
                                   300, 200);
  
   $scope.styleModPos = StyleModelContainer.get('modal-pos');
   $scope.styleModSize = StyleModelContainer.get('modal-size');

   $scope.styleModPos.addStyle('modal-pos', function (x, y) {
      return   {
               'position': 'fixed',
               'top': y + 'px',
               'left': x + 'px',
               'width': '300px',
               'height': '200px'
               };
   });
   
   $scope.styleModSize.addStyle('modal-size', function (x, y) {
      return   {
               'width': x + 'px',
               'height': y +'px'
               };
   });
   
   $scope.styleModSize.addStyle('resizer-pos', function (x, y) {
      return   {
               'top': (y - 26) + 'px',
               'left': (x - 26) + 'px'
               };
   });
});
```

Then in the html bind the model transform directive to an element and set ng-style on the elements that need to be transformed:

```html
<body ng-controller="MainCtrl">
   <div id="ex1">
      <div id="modal-wrapper"
         ng-style="styleModPos.styleObject['modal-pos'].style">
      <div class="panel panel-default"
            ng-style="styleModSize.styleObject['modal-size'].style">
         <div class="panel-heading" 
               transform-multi-style style-name="modal-pos">
            <h3 class="panel-title">Panel title</h3>
         </div>
         <div class="panel-body">
            Panel content
            <div id="resizer"
               transform-multi-style style-name="modal-size"
               ng-style="styleModSize.styleObject['resizer-pos'].style">
               <span class="glyphicon glyphicon-move"></span>
            </div>
         </div>
      </div>
      </div>
   </div>
</body>
```
