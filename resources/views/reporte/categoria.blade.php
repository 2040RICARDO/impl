
<!DOCTYPE html>
<html lang="es-ES">
<head>
  <meta charset="utf-8">
  <title></title>
  <style type="text/css">
  body{
    font-family: Arial;
  }

  #main-container{
    margin: 20px auto;
 
  }

  table{
    background-color: white;
    text-align: left;
    border-collapse: collapse;
    width: 100%;
  }

  th, td{
    padding: 10px;
  }



  tr:nth-child(even){
    background-color: #ddd;
  }

  .flex-container {
    display: flex;
    justify-content: flex-start; 
  }

</style>
</head>
<body>
  <div id="main-container">
    <div class="flex-container" style="float:left">
        <div>
          <p align="center" style="font-size: 14px;font-family:Copperplate; letter-spacing:2.5px;">
          Imprenta - Unsxx</b></p>
        </div>
      </div>
      <br><br>
      <table align="center"  width="100%">
        <thead>
          <tr align="center">
              <td colspan="" style="font-size: 120%; font-weight: bold;">CATEGORIAS DE PRODUCTO</strong></td>
          </tr>
        </thead>
      </table>   
      <br>


      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #457089; color: black;font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">CATEGORIA</th>
            <th style="font-size: 85%;" align="center">DESCRIPCION</th>
            <th style="font-size: 85%;" align="center">ESTADO</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($categorias as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->categoria}}</td>
                    <td style="font-size: 80%;width: 100px;">{{$value->descripcion}}</td>
                    <td style="font-size: 80%;" align="center">{{$value->estado == true?'HABILITADO':'DESHABILITADO'}}</td>
                </tr>
                </tr>
                </tr>
            @endforeach
        </tbody>
      </table>
      <footer>
        <br>
        <span style="font-size: 12px;float: left;"> {{ date('Y-m-d')  }}</span><br>
      </footer>
    </body>
  </div>
</html>








































