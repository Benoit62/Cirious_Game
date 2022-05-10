<?php 
session_start();
if(isset($_SESSION['autorisation']) && $_SESSION['autorisation'] == 'iseed') {
    header('location: profil.php');
}
require_once('config/configbdd.php');
$bdd=NULL;

?>
<!DOCTYPE html>
<html>
	<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Sign in & Sign Up Form | Vanilla Javascript</title>
		<link rel="stylesheet" type="text/css" href="login.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	</head>
	<body>
        <section>
            <div class="container">
                <div class="user signinBx">
				    <div class="imgBx"><img src="images/Farmer_Man_Login.png"></div>
                    <div class="formBx">
                        <form method="POST" action="config/configco.php">
                            <h2>Sign In</h2>
                            <input id="pseudo_co" type="text" name="pseudo" value="" placeholder="Username" minlength="2" maxlength="30" required>
                            <input id="mdp_co" type="password" name="mdp" value="" placeholder="Password" minlength="2" maxlength="200" autocomplete="current-password" required>
						    <ion-icon id="cp1" name="eye-off-outline"></ion-icon>
                            <input type="submit" name="valider" value="connexion">
                            <p class="signup">don't have an account? <a href="#" onclick="toggleForm();">Create an account.</a></p>
                        </form>
                    </div>
                    <div id="leaves">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <div class="user signupBx">
                    <div class="formBx">
                        <form method="POST" action="config/configinsc.php">
                            <h2>Create an account</h2>
                            <input id="pseudo" type="text" name="pseudo" value="" placeholder="Username" minlength="2" maxlength="30" required>
                            <input id="mail" type="email" name="mail" value="" placeholder="Email Address" minlength="3" maxlength="100" required>
                            <input id="mdp" type="password" name="mdp" value="" placeholder="Create Password" minlength="2" maxlength="256" required>
						    <ion-icon id="cp2" name="eye-off-outline"></ion-icon>
                            <input id="verif_mdp" type="password" name="verif_mdp" value="" placeholder="Confirm Password" minlength="2" maxlength="256" required>
						    <ion-icon id="cp3" name="eye-off-outline"></ion-icon>
                            <input type="submit" name="valider" value="inscription">
                            <p class="signup">Already have an account? <a href="#" onclick="toggleForm();">Sign in.</a></p>
                        </form>
                        <div>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                    </div>
                    <div class="imgBx"><img src="images/Farmer_Woman_Login2.png"></div>
                </div>
            </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        <script type="text/javascript">

            let bool = 0; //state
            //change from sign in to sign up and add leaves effect
            function toggleForm() {
                var container = document.querySelector('.container');
                var section = document.querySelector('section');
                container.classList.toggle('active');
                section.classList.toggle('active');
                document.getElementById('leaves').removeAttribute('id');
                setTimeout(function () {
                    if (!bool) {
                        bool = 1;
                        document.getElementsByTagName('div')[7].setAttribute('id', 'leaves');
                    }
                    else {
                        bool = 0;
                        document.getElementsByTagName('div')[4].setAttribute('id', 'leaves');
                    }
                }, 100)

            }

            //change input type to see or not password
            function changeInput(input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    input.nextElementSibling.name = 'eye-outline';
                }
                else {
                    input.type = 'password';
                    input.nextElementSibling.name = 'eye-off-outline';
                }
            }

            let pass1 = document.getElementById('cp1');
            let pass2 = document.getElementById('cp2');
            let pass3 = document.getElementById('cp3');
           pass1.addEventListener('click', () => {
                changeInput(document.getElementById('mdp_co'));
            });
            pass2.addEventListener('click', () => {
                changeInput(document.getElementById('mdp'));
            });
            pass3.addEventListener('click', () => {
                changeInput(document.getElementById('verif_mdp'));
            });
        </script>
        <script>
            let inputPseudo = document.getElementById('pseudo');
            inputPseudo.addEventListener('input', checkPseudo, false);
            function checkPseudo(evt) {
                let pseudo = evt.target.value;
                $.ajax({
                    type: 'POST',
                    url: 'config/check_insc.php',
                    data: {
                        pseudo:pseudo
                    },
                    success: function (response) {
                        console.log(response);
                        if(response == 'exist') {
                            console.log(evt.target.style);
                            evt.target.style.boxShadow = 'inset 0 1px 1px rgba(0, 0, 0, 0.07), 0 0 8px rgb(194, 11, 11)';
                        }
                        else {
                            evt.target.style.boxShadow = 'inset 0 1px 1px rgba(0, 0, 0, 0.07), 0 0 8px rgb(11, 194, 11)';
                        }
                    }
                });
            }

            let inputMail = document.getElementById('mail');
            inputMail.addEventListener('input', checkMail, false);
            function checkMail(evt) {
                let mail = evt.target.value;
                $.ajax({
                    type: 'POST',
                    url: 'config/check_insc.php',
                    data: {
                        mail:mail
                    },
                    success: function (response) {
                        console.log(response);
                        if(response == 'exist') {
                            console.log(evt.target.style);
                            evt.target.style.boxShadow = 'inset 0 1px 1px rgba(0, 0, 0, 0.07), 0 0 8px rgb(194, 11, 11)';
                        }
                        else {
                            evt.target.style.boxShadow = 'inset 0 1px 1px rgba(0, 0, 0, 0.07), 0 0 8px rgb(11, 194, 11)';
                        }
                    }
                });
            }
        </script>
	</body>
</html>
