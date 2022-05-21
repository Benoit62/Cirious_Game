<?php
session_start();
if (!isset($_SESSION['autorisation']) && $_SESSION['autorisation'] != 'iseed') {
  header('location: login.php');
}

include("config/configbdd.php");

$compte = $_SESSION['id'];

$query = $bdd->prepare("SELECT * FROM comptes WHERE id = :id");
$query->bindValue(':id', $compte, PDO::PARAM_INT);
$query->execute();
$profil = $query->fetch();
$query->closeCursor();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="profil.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <link rel="shortcut icon" href="images/logo.png" type="image/x-icon">
  <link rel="icon" href="images/logo.png" type="image/x-icon">

  <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">

  <title>profile</title>
</head>

<body>
  <div id="P" class="navigation">
    <div class="menu_toggle"></div>
    <div class="profile">
      <div class="imgBx">
        <img src="<?= $profil['pdp'] ?>" alt="profile picture" id="output">
      </div>
    </div>
    <ul class="menu">
      <li>
        <p>
          <span class="icon">
            <ion-icon name="person-outline"></ion-icon>
          </span>
          <span class="text">Pseudo : <?= $profil['pseudo'] ?></span>
        </p>
      </li>
      <li>
        <p>
          <span class="icon">
            <ion-icon name="mail-outline"></ion-icon>
          </span>
          <span class="text">Mail : <?= $profil['mail'] ?></span>
          <!--récupérer mail sur database-->
        </p>
      </li>
      <li>
        <p>
          <span class="icon">
            <ion-icon name="cash-outline"></ion-icon>
          </span>
          <span class="text">Money : <?= $profil['money'] ?></span>
          <!--récupérer level sur database-->
        </p>
      </li>
      <li>
        <p>
          <span class="icon">
            <ion-icon name="bar-chart-outline"></ion-icon>
          </span>
          <span class="text">Level : <?= $profil['lvl'] ?></span>
          <!--récupérer level sur database-->
        </p>
      </li>
      <li>
        <a>
          <input class="text" id="inner" type="file" onchange="loadFile(event)" accept=".png, .jpg, .jpeg" />
          <span class="icon">
            <ion-icon name="camera-outline"></ion-icon>
          </span>
          <span class="text">Change profile picture</span>
          <!--faire script changer pdp sur base de donnéee-->
        </a>
      </li>
      <li>
        <a id="changeP">
          <span class="icon">
            <ion-icon name="document-lock-outline"></ion-icon>
          </span>
          <span class="text">Change password</span>
          <!--faire script changer pdp sur base de donnéee en demandant de rensiegner l'ancien-->
        </a>
      </li>
      <li>
        <a href="deco.php">
          <span class="icon">
            <ion-icon name="log-out-outline"></ion-icon>
          </span>
          <span class="text">Logout</span>
          <!--faire script changer pdp sur base de donnéee-->
        </a>
      </li>
    </ul>
  </div>
  <form id="popup">
    <div>Ancien mot de passe</div>
    <input id="pass1" type="password" autocomplete="current-password" />
    <ion-icon id="cp1" name="eye-off-outline"></ion-icon>

    <div>Nouveau mot de Passe</div>
    <input id="pass2" type="password" autocomplete="off" />
    <ion-icon id="cp2" name="eye-off-outline"></ion-icon>

    <div>Confirmez le nouveau mot de passe</div>
    <input id="pass3" type="password" autocomplete="off" />
    <ion-icon id="cp3" name="eye-off-outline"></ion-icon>


    <div class="choise">
      <a class="icon" onclick="done()">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
      </a>
      <a class="icon" onclick="closeForm()">
        <ion-icon name="close-circle-outline"></ion-icon>
      </a>
    </div>

  </form>

  <div class="disp">
    <img src="./images/background_profil.jpg">

    
    <div class="container">

    <main>
	<button onclick="window.location.href='game.php';">New Game</button>
  </main>

      <!--<a ><span>Continue</span></a>
      <a href="game.php"><span>New game</span></a>-->
      
    </div>

    


    <!--<div class="info">
       <ul>
        <li>Niveau :</li>
        <li>Argent :</li>
      </ul>
      <ul>
        <li></li>
      </ul>
    </div>-->
  </div>





  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
  <script>
    //menu affichage
    const menu_toggle = document.querySelector('.menu_toggle');
    const navigation = document.querySelector('.navigation');
    menu_toggle.addEventListener('click', () => {
      navigation.classList.toggle('active');
      if(document.getElementsByClassName('disp')[0].children[0].style.height!="130%")
      document.getElementsByClassName('disp')[0].children[0].style.height="130%";
      else document.getElementsByClassName('disp')[0].children[0].style.height="105%";
    })
  </script>


  <script>
    //nouvelle image de profil
    let loadFile = function(event) {
      var image = document.getElementById('output');
      image.src = URL.createObjectURL(event.target.files[0]);
    };

    //zoom sur l'image de profil
    let zoomed = true;

    function zoom(img) {
      if (zoomed) {
        img.parentElement.style.borderRadius = "0%";
        zoomed = false;
        img.style.cursor = "zoom-in";
      } else {
        img.parentElement.style.borderRadius = "50%";
        img.style.cursor = "zoom-out";
        zoomed = true;
      }
    }
    let img = document.getElementById('output');
    img.addEventListener('click', () => zoom(img));

    //changement entre password affiché/caché
    function changeInput(input) {
      if (input.type === "password") {
        input.type = "text";
        input.nextElementSibling.name = "eye-outline"
      } else {
        input.type = "password";
        input.nextElementSibling.name = "eye-off-outline"
      }
    }
    let pass1 = document.getElementById('cp1');
    let pass2 = document.getElementById('cp2');
    let pass3 = document.getElementById('cp3');
    pass1.addEventListener('click', () => {
      changeInput(document.getElementById('pass1'));
    })
    pass2.addEventListener('click', () => {
      changeInput(document.getElementById('pass2'));
    })
    pass3.addEventListener('click', () => {
      changeInput(document.getElementById('pass3'));
    })




    //affichage ou non du formulaire de changement de mdp
    function openForm() {
      if (document.getElementById('popup').style.display != 'block') {
        document.getElementById('pass1').value = "";
        document.getElementById('pass2').value = "";
        document.getElementById('pass3').value = "";
        document.getElementById('popup').style.display = 'block';
        cP.removeEventListener('click', () => {
          openForm();
        });
        cP.addEventListener('click', () => {
          closeForm();
        });
        document.getElementById('P').style.display = 'none';
      }
    }

    function closeForm() {
      document.getElementById('popup').style.display = 'none';
      cP.removeEventListener('click', () => {
        closeForm();
      });
      cP.addEventListener('click', () => {
        openForm();
      });
      document.getElementById('P').style.display = 'block';
    }

    function done() {
      document.getElementById('P').style.display = 'block';
      let pass1 = document.getElementById('pass1').value;
      let pass2 = document.getElementById('pass2').value;
      let pass3 = document.getElementById('pass3').value;
      $.ajax({
        type: 'POST',
        url: 'config/modif_password.php',
        data: {
          old_pass: pass1,
          new_pass: pass2,
          confirm_new_pass: pass3
        },
        success: function(response) {
          console.log(response);
          if (response == 'changed') {
            closeForm();
          }
          if (response == 'error') {
            document.getElementById('pass1').style.borderColor = 'red';
            document.getElementById('pass2').style.borderColor = 'red';
            document.getElementById('pass3').style.borderColor = 'red';
          }
        }
      });
      //envoyer les 3 password, comparer le 1 avec la database et les deux autres entre eux
    }

    let cP = document.getElementById('changeP');
    cP.addEventListener('click', () => {
      openForm();
    });
    //par défaut off
    closeForm();
  </script>
</body>

</html>