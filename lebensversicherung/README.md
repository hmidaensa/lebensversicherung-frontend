# Lebensversicherung

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


util for deplyoment


minikube start
minikube status

kubectl get pods 


docker ps 
docker images




#### deployment with docker
docker build -t yourusarenmdocker/myapp:latest  .  
docker run -d -p 8080:80 myapp:latest




### or docker compose
docker-compose up --build -d
docker image push atanane/myapp-lebensversicherung:latest

### kuberntes 
# Start minikube
minikube start --driver=docker

# Set docker env
minikube docker-env | Invoke-Expression # PowerShell
## install helm 
helm install lebensverischerung-chart-2 lebensversicherung



# Check that it's running
kubectl get pods

kubectl get pods -o wide
###
minikube tunnel  ## external ip

 --namespace=foo
kubectl delete --all deployments --namespace=foo

kubectl delete --all namespaces

helm install  app-deplyoment-1  lebensversicherung
helm upgrade  app-deplyoment-1  lebensversicherung
helm list -a

minikube service service-name --url 
minikube service pods-name --url --namespace=name of space

## igress

minikube addons enable ingress

minikube tunnel

minikube dashboard --url 

##

kubectl port-forward podname yourport:80


kubectl describe svc app-namespace-lebensversicherung --namespace=lebensversicherung



