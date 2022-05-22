<?php
session_start();
if (!empty($_SESSION['autorisation']) && $_SESSION['autorisation'] == 'iseed') {
    if(!empty($_POST['save'])){
        include('configbdd.php');
        $profil = $_SESSION['id'];
        var_dump($_POST['dataGlobal']);
        $query = $bdd->prepare('INSERT INTO games (profil, registry, europe, aride, tropic, polaire, dataGlobal) VALUES (:profil, :registry, :europe, :aride, :tropic, :polaire, :dataGlobal)');
        $query->bindValue(':profil', $profil, PDO::PARAM_INT);
        $query->bindValue(':registry', $_POST['registry'], PDO::PARAM_STR);
        $query->bindValue(':europe', $_POST['europe'], PDO::PARAM_STR);
        $query->bindValue(':aride', $_POST['aride'], PDO::PARAM_STR);
        $query->bindValue(':tropic', $_POST['tropic'], PDO::PARAM_STR);
        $query->bindValue(':polaire', $_POST['polaire'], PDO::PARAM_STR);
        $query->bindValue(':dataGlobal', $_POST['dataGlobal'], PDO::PARAM_STR);
        $insertion = $query->execute();
    }
}
?>