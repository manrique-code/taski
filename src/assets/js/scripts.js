const{ipcRenderer} = require('electron')
window.$ = window.jQuery = require('jquery')
const{dialog} = require('electron').remote

var db;
var nombre = "TaskiDB";
var version = "1.0";
var descripcion = "Base de datos de Taski; app para gestionar trabajos asignados por docentes";
var sice = 30 * 1024 * 1024;

db = openDatabase(nombre, version, descripcion, sice)

var docente = `CREATE TABLE IF NOT EXISTS Docente
                (
                    codDocente text primary key,
                    nombre text not null,
                    apellido text not null,
                    fechaNacimiento date not null,
                    titulo text null
                )`;

var cuentas = `CREATE TABLE IF NOT EXISTS Cuenta 
               (
                   idCuenta integer primary key autoincrement,
                   nombreUsuario text not null unique,
                   password text not null,
                   codDocente text not null,
                   estadoCuenta integer not null
               )`;

var asignatura = `CREATE TABLE IF NOT EXISTS Asignatura 
                  (
                    idAsignatura integer primary key autoincrement,
                    nombreAsignatura text not null unique
                  )`;

var periodo = `CREATE TABLE IF NOT EXISTS Periodo
               (
                   idPeriodo integer primary key autoincrement,
                   numPeriodo integer not null unique
               )`;

var parcial = `CREATE TABLE IF NOT EXISTS Parcial 
               (
                   idParcial integer primary key autoincrement,
                   numParcial integer not null unique
               )`;


var institucion = `CREATE TABLE IF NOT EXISTS Instituto
                   (
                       codInstituto text primary key,
                       nombreInstituto text not null,
                       codDocente text not null
                   )`;
            
var clase = `CREATE TABLE IF NOT EXISTS Clase
             (
                idClase integer primary key autoincrement,
                horaEntrada text not null,
                horaSalida text not null,
                dias text not null,
                idAsignatura integer not null,
                codDocente text not null,
                idPeriodo integer not null
             )`;

var tarea = `CREATE TABLE IF NOT EXISTS Tarea
             (
                idTarea integer primary key autoincrement,
                tituloTarea text not null,
                descripcionTarea text not null,
                puntaje integer not null,
                fechaAsignacion date not null,
                fechaEntrega date not null,
                finalizada integer not null,
                idParcial integer not null,
                idClase integer not null
             )`;

//creación de la base de datos 
db.transaction(tx => {
    tx.executeSql(docente);
    tx.executeSql(cuentas);
    tx.executeSql(asignatura);
    tx.executeSql(periodo);
    tx.executeSql(parcial);
    tx.executeSql(institucion);
    tx.executeSql(clase);
    tx.executeSql(tarea);

    console.log('base de datos creada')
})
