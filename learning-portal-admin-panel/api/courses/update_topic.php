
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

    $topic_id = $data->id;
    $course = $data->course;
    $topic_title = $data->title;
    $content = $data->content;
    $status = $data->status;

    if (!empty($topic_id)) {
        $location_data = array(
            'Title' => $topic_title,
            'Slug' => $core->slugify($topic_title),
            'Content' => $content,
            'CourseID' => $course,
            'Status' => $status,
            'CreatedAt' => $core->datetime,
        );
        $location_id = $db->update('course_topics', $location_data,"ID=$topic_id");
        if ($location_id === TRUE) {
            $request->meta = [
                "error" => false,
                "message" => 'Topic successfully Added'
            ];
            $request->id = $topic_id;
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
