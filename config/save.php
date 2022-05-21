<?php

    var_dump($_GET);
    echo '<br><br><br>';
    foreach($_GET as $i => $data):
        var_dump($i, $data);
        echo '<br><br>';
    endforeach;
?>