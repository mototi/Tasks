<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>skills</title>
</head>
<body>
    <div class ="skill_one">
        <p><strong>skill : </strong> <span> <?php echo $jsonData[0]['skill']?> </span></p>
        <p><strong>experience : </strong> <span> <?php echo $jsonData[0]['experience']?> </span></p>
    </div>
    <div class ="skill_two">
        <p><strong>skill : </strong> <span> <?php echo $jsonData[1]['skill']?> </span></p>
        <p><strong>experience : </strong> <span> <?php echo $jsonData[1]['experience']?> </span></p>
    </div>
</body>
</html>