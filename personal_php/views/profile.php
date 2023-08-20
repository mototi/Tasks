<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My profile</title>
</head>
<body>
    <?php
        echo "<img src=" . $jsonData['avatar'] . " width = 200px>";
    ?>
    <p><strong>NAME : </strong> <span> <?php echo $jsonData['name']?> </span></p>
    <p><strong>EMAIL : </strong> <span> <?php echo $jsonData['email']?> </span></p>
    <p><strong>BIO : </strong> <span> <?php echo $jsonData['bip']?> </span></p>

    
</body>
</html>