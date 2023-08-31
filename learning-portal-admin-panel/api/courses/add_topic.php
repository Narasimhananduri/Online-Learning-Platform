
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $course = $data->course;
    $topic_title = $data->title;
    $content = $data->content;
    $status = $data->status;

    if (!empty($course)) {
        $location_data = array(
            'Title' => $topic_title,
            'Slug' => $core->slugify($topic_title),
            'Content' => $content,
            'CourseID' => $course,
            'Status' => $status,
            'CreatedAt' => $core->datetime,
        );
        $location_id = $db->add('course_topics', $location_data);
        // var_dump($location_id);
        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Topic successfully Added'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
