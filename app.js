//noinspection JSUnresolvedFunction,JSUnresolvedVariable
angular.module('app', ['ui.grid'])

.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;
    $scope.shown=false;

  
  vm.gridOptions = {};
  
  vm.reset = reset;
  
  function reset() {
    vm.gridOptions.data = [];
    vm.gridOptions.columnDefs = [];

  }






}])

.directive("fileread", [function () {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
          $scope.shown=true;
            var i =0;
            $scope.test = [];
            $scope.test1 = [];
          $scope.$apply(function () {
            var data = evt.target.result;
            
            var workbook = XLSX.read(data, {type: 'binary'});
            
            var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
            
            var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
            
            $scope.opts.columnDefs = [];
            headerNames.forEach(function (h) {
              $scope.opts.columnDefs.push({ field: h });
            });
            
            $scope.opts.data = data;
            for(var i=0;i<$scope.opts.data.length;i++){
               // $scope.test[i]=['value'=$scope.opts.data[i].valeurs,];
                $scope.test[i]={label:$scope.opts.data[i].valeurs,value:$scope.opts.data[i].occurrences};
                $scope.test1[i]={y:$scope.opts.data[i].valeurs,a:$scope.opts.data[i].occurrences};

            }
            //console.log($scope.test);
              // console.log($scope.opts.data[0]);
              //DONUT CHART
              var donut = new Morris.Donut({
                  element: 'sales-chart',
                  resize: true,
                  colors: ["#3c8dbc", "#f56954", "#00ACA2","#00af56","#0f568a","#20f56a"],
                  data: $scope.test,
                  hideHover: 'auto'
              });
              //BAR CHART
              var bar = new Morris.Bar({
                  element: 'bar-chart',
                  resize: true,
                  data: $scope.test1 ,
                  barColors: ['#00a65a'],
                  xkey: 'y',
                  ykeys: ['a'],
                  labels: ['Occurrence'],
                  hideHover: 'auto'
              });
            
            $elm.val(null);
          });
        };
        
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  }
}]);
