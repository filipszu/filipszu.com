<html>
<head>
	<meta charset="utf-8">
</head>
<style>

body{
	font-family: sans-serif;
	margin-left: 20px;
}

ul li {
	list-style: square;
	color:#D30C0C;
}

ul li a {
	color:#000;
	font-weight: bold;
}

ul ul li{
	list-style: square;
}

ul li:hover {
	list-style: circle;
}



</style>
<body>
	<img src="logo.png"/>
	<h1>Live Demos:</h1>
	<?php getDemoProjects();?>
</body>
</html>

<?php
	function getDemoProjects(){
		$html = '<ul>';
		$path = getcwd();
		$results = scandir($path);
		foreach ($results as $result) {
			
		    if ($result === '.' or $result === '..') continue;

		    if (is_dir($path . '/' . $result)) {
		        include($result.'/info.php');
		        if($data['multi_demo']){
		        	$html .= '<li><span style="color: black;">'.$data['desc'].'<ul>';
		        	foreach ($data['demos_array'] as $key => $value) {
		        		$html .= '<li><a href="'.$result.'/'.$key.'/">'.$value.'</a></li>';
		        	}
		        	$html .= '</ul></span></li>';
		        }else{
		        	$html .= '<li><a href="'.$result.'/">'.$data['desc'].'</a></li>';
		       }
		    }
		}
		$html .= '</ul>';
		echo($html);
	}
?>