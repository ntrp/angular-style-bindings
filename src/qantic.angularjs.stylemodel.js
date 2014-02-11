'use strict';

angular.module('qantic.angularjs.stylemodel', [])
 
.provider('StyleModelContainer', function () {

  this.$get = function () {

    var modelTemplate = {
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0,
      pivotx: 0,
      pivoty: 0,
      styleObject: {},
      addStyle: function (styleName, transformFn) {
        this.styleObject[styleName] = {
               style: transformFn.call(null, this.pivotx, this.pivoty), 
               modelFn: transformFn
            };
      },
      delStyle: function (i) {
        this.styleObject.splice(i, 1);
      },
      transform: function (px, py) {
            this.pivotx = px = Math.min(Math.max(px, this.minx), this.maxx);
            this.pivoty = py = Math.min(Math.max(py, this.miny), this.maxy);
        angular.forEach(this.styleObject, function (value, key) {
          value['style'] = value['modelFn'].call(null, px, py);
        });
      }
    };

      var modelsObj = {};

      return {
         add: function (name, minx, maxx, miny, maxy, px, py) {
            var model = angular.copy(modelTemplate);
            angular.extend(model, {'minx': minx, 'maxx': maxx, 'miny': miny, 'maxy': maxy, 'pivotx': px, 'pivoty': py});
            modelsObj[name] = model;
         },
         del: function (name) {
            delete modelsObj[name]; 
         },
         get: function (name) {
            return modelsObj[name];
         }
      }
  };
})   

.directive('transformMultiStyle', ['$document', 'StyleModelContainer', function ($document, StyleModelContainer) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attr) {
         var   styleModel = StyleModelContainer.get(attr.styleName),
               px = 0,
               py = 0,
               dx = 0,
               dy = 0;
         
         elem.bind('mousedown', function (event) {
            if (event.button !== 0) {
               return;
            }
            event.preventDefault();
            $document.unbind('mousemove', trasformStyle);
            $document.unbind('mouseup', detachTransform);
            px = styleModel.pivotx;
            py = styleModel.pivoty
            dx = event.pageX - px;
            dy = event.pageY - py;
            $document.bind('mousemove', trasformStyle);
            $document.bind('mouseup', detachTransform);
         });
         
         function trasformStyle(event) {
            px = event.pageX - dx;
            py = event.pageY - dy;
            scope.$apply(styleModel.transform(px,py));
         }
         
         function detachTransform() {
            $document.unbind('mousemove', trasformStyle);
            $document.unbind('mouseup', detachTransform);
         }
    }
  };
}]);
