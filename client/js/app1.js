var myApp1=angular.module("myVehiculo",['lbServices']);
myApp1.controller("myVehiculoController",function($scope,$http,Vehiculo) {
    console.log('Vehiculo Controller');
    $scope.vehiculos=Vehiculo.find();
    $scope.NuevoVehiculo="";
    $scope.NuevoSOAT="";
    $scope.NuevoConductor="";
    
    $scope.pushVehiculo = function(){
        if($scope.NuevoVehiculo !="" && $scope.NuevoSOAT!="" && $scope.NuevoConductor!=""){
            Vehiculo.create({Placa: $scope.NuevoVehiculo,SOAT: $scope.NuevoSOAT,Conductor: $scope.NuevoConductor}).$promise.then(function(Placa,SOAT,Conductor){
                $scope.vehiculos=[];
                $scope.vehiculos=Vehiculo.find();
                $scope.vehiculos.push(Placa,SOAT,Conductor);
                $scope.NuevoVehiculo="";
                $scope.NuevoSOAT="";
                $scope.NuevoConductor="";
            })
        }
    }
    $scope.eliminarVehiculo=function(index){
        Vehiculo.deleteById({id:$scope.vehiculos[index].id}).$promise.then(function(){
            $scope.vehiculos.splice(index,1)
        })
    }
});