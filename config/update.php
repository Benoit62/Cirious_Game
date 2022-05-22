<?php
session_start();
if (!empty($_SESSION['autorisation']) && $_SESSION['autorisation'] == 'iseed') {
    if(!empty($_POST['update'])){
        include('configbdd.php');
        $profil = $_SESSION['id'];
        
        $query = $bdd->prepare('UPDATE games SET registry = :registry WHERE id = :id && profil = :profil');
        $query->bindValue(':profil', $profil, PDO::PARAM_INT);
        $query->bindValue(':registry', $_POST['registry'], PDO::PARAM_STR);
        $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
        $insertion = $query->execute();


        if($_POST['europe'] != "{}") {
            $query = $bdd->prepare('UPDATE games SET europe = :europe WHERE id = :id && profil = :profil');
            $query->bindValue(':profil', $profil, PDO::PARAM_INT);
            $query->bindValue(':europe', $_POST['europe'], PDO::PARAM_STR);
            $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
            $insertion = $query->execute();
        }
        if($_POST['aride'] != "{}") {
            $query = $bdd->prepare('UPDATE games SET aride = :aride WHERE id = :id && profil = :profil');
            $query->bindValue(':profil', $profil, PDO::PARAM_INT);
            $query->bindValue(':aride', $_POST['aride'], PDO::PARAM_STR);
            $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
            $insertion = $query->execute();
        }
        if($_POST['tropic'] != "{}") {
            $query = $bdd->prepare('UPDATE games SET tropic = :tropic WHERE id = :id && profil = :profil');
            $query->bindValue(':profil', $profil, PDO::PARAM_INT);
            $query->bindValue(':tropic', $_POST['tropic'], PDO::PARAM_STR);
            $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
            $insertion = $query->execute();
        }
        if($_POST['polaire'] != "{}") {
            $query = $bdd->prepare('UPDATE games SET polaire = :polaire WHERE id = :id && profil = :profil');
            $query->bindValue(':profil', $profil, PDO::PARAM_INT);
            $query->bindValue(':polaire', $_POST['polaire'], PDO::PARAM_STR);
            $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
            $insertion = $query->execute();
        }
        if($_POST['dataGlobal'] != "{}") {
            $query = $bdd->prepare('UPDATE games SET dataGlobal = :dataGlobal WHERE id = :id && profil = :profil');
            $query->bindValue(':profil', $profil, PDO::PARAM_INT);
            $query->bindValue(':dataGlobal', $_POST['dataGlobal'], PDO::PARAM_STR);
            $query->bindValue(':id', $_SESSION['game'], PDO::PARAM_INT);
            $insertion = $query->execute();
        }
        unset($_SESSION['game']);
    }
}
?>