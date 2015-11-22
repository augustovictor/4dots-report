angular.module("despesasApp", [])
    .controller("DespesasController", function($scope, $http){
        
        var self = this;
        
        var req = {
             method: 'GET',
             url: 'https://gist.githubusercontent.com/brunojppb/3da2415d52a0ff0db15b/raw/69461a7717c8ba058c451806bd89ae19fbfbe9da/despesas',
             headers: {
               'Content-Type': 'application/json'
             }
        }
        
        $http(req)
            .then(function(data){
              
        });
    
});