var myApp=angular.module("myPersona",['lbServices']);
myApp.controller("myPersonaController",function($scope, $http,Persona) {
    $scope.personas=[];
    $scope.personas=Persona.find();
    $scope.NuevaPersona="";
    $scope.Pagina = 0; // 0 initial
    $scope.LineasPorPagina = 3;
    $scope.Personas2 = [
        {"Nombre":"Aleja"   ,"Sexo":"F"},
        {"Nombre":"Boris"   ,"Sexo":"M"},
        {"Nombre":"Carlos"  ,"Sexo":"M"},
        {"Nombre":"Diego"   ,"Sexo":"M"},
        {"Nombre":"Elisa"   ,"Sexo":"F"},
        {"Nombre":"Felix"   ,"Sexo":"M"},
        {"Nombre":"Geronimo","Sexo":"M"},
        {"Nombre":"Hector"  ,"Sexo":"M"}
        ];
    $scope.PaginasF = function() {
        return Math.ceil($scope.personas.length / $scope.LineasPorPagina);
    }
    $scope.incrementarP = function() {
        if( $scope.Pagina < $scope.PaginasF() - 1 )
            $scope.Pagina++;
    };
    $scope.decrementarP = function() {
        if( $scope.Pagina != 0)
                $scope.Pagina--;
    };
    $scope.incrementarLPP = function() {
        if( $scope.LineasPorPagina < $scope.personas.length )
                $scope.LineasPorPagina++;
        // test paginacion max
        if( $scope.Pagina >= $scope.PaginasF() - 1 )
                $scope.Pagina = $scope.PaginasF() - 1;
    };
    $scope.decrementarLPP = function() {
        if( $scope.LineasPorPagina > 1 ) {
                $scope.LineasPorPagina--;
        }
    };
    $scope.decrementarLPP = function() {
        if( $scope.LineasPorPagina > 2 ) {
            $scope.LineasPorPagina = $scope.LineasPorPagina - 1;
            // redraw HTLM para indice de paginacion
            $scope.Techo = Math.ceil($scope.personas.length / $scope.LineasPorPagina);
        }
    };
    $scope.setPagina = function(p) {
        $scope.Pagina = p;
    };
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.Orden   = "";
    $scope.Reversa = false;
    $scope.ordenarPor = function(titulo) {
        if ($scope.Orden == titulo) {
             //click mismo titulo
            $scope.Reversa = !$scope.Reversa;
        } else {
            $scope.Reversa = false;
        }
        $scope.Orden = titulo;
    };
    $scope.ordenarPor = function(titulo) {
        if ($scope.Orden == titulo) {
             //click mismo titulo
            $scope.Reversa = !$scope.Reversa;
        } else {
            $scope.Reversa = false;
        }
        $scope.Orden = titulo;
    };
    $scope.Filtro = "";
    $scope.pushPersona = function(){
        if($scope.NuevaPersona !=""){
            Persona.create({Nombre: $scope.NuevaPersona}).$promise.then(function(Nombre){
                $scope.personas.push(Nombre);
                $scope.NuevaPersona="";
            })
        }
    }
    $scope.eliminarPersona=function(index){
        Persona.deleteById({id:$scope.personas[index].id}).$promise.then(function(){
            $scope.personas.splice(index,1)
        })
    }
});