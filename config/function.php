<?php
function securisation($champ){
    $champ = trim($champ);
    $champ = stripslashes($champ);
    $champ = strip_tags($champ);
    $champ = htmlspecialchars($champ);
    return $champ;
}

function securisationTab($tab){
    foreach($tab as $i => $champ):
        $tab[$i] = trim($champ);
        $tab[$i] = stripslashes($champ);
        $tab[$i] = strip_tags($champ);
        $tab[$i] = htmlspecialchars($champ);
    endforeach;
    return $tab;
}

function securisation_low($champ){
    $champ = trim($champ);
    $champ = stripslashes($champ);
    $champ = strip_tags($champ, '<a> <i> <br>');
    return $champ;
}

function debug($array){
    $bebug = '';
    foreach($array as $k => $value){
        if($k == 'mdp' || $k == 'mdp') {
            $value = 'secret';
        }
        $tmp = "\$array[$k] => $value.\n";
        $bebug .= $tmp.'_';
    }
    $bebug = substr($bebug, 0, -1);
    $domain = $_SERVER['SERVER_NAME'];
    $time = time() + 60*2;
    setcookie ("debug", $bebug, $time, '/', $domain, true , true );
}

function taille_chaine($chaine, $taille_max) {
    if(strlen($chaine) >= 1 && strlen($chaine) <= $taille_max) {
        return true;
    }
    else {
        return false;
    }
}


function reArrayFiles(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}


if (!function_exists('str_contains')) {
    function str_contains($haystack, $needle) {
        return $needle !== '' && mb_strpos($haystack, $needle) !== false;
    }
}

?>