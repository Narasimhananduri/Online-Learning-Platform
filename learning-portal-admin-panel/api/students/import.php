<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');

require('../inc/core.php');
require('../vendor/autoload.php');

use Phppot\DataSource;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

$core = new Core();
$db = $core->dbcon;
$completed = false;
$request = new \stdClass();
if (isset($_FILES["file"])) {
    $allowedFileType = [
        'application/vnd.ms-excel',
        'text/xls',
        'text/xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/octet-stream'
    ];
    if (in_array($_FILES["file"]["type"], $allowedFileType)) {
        $targetPath = $_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
        $Reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
        $spreadSheet = $Reader->load($targetPath);
        $excelSheet = $spreadSheet->getActiveSheet();
        $spreadSheetAry = $excelSheet->toArray();
        $sheetCount = count($spreadSheetAry);

        for ($i = 1; $i <= $sheetCount - 1; $i++) {

            $fullname = "";
            if (isset($spreadSheetAry[$i][1])) {
                $fullname = trim($db->real_escape_string($spreadSheetAry[$i][1]));
            }
            $class = "";
            if (isset($spreadSheetAry[$i][2])) {
                $class = trim(preg_replace("/[^0-9]/", "", $db->real_escape_string($spreadSheetAry[$i][2])));
            }
            $school = "";
            if (isset($spreadSheetAry[$i][3])) {
                $school = trim($db->real_escape_string($spreadSheetAry[$i][3]));
            }
            $gender = "";
            if (isset($spreadSheetAry[$i][4])) {
                $gender = ucfirst(trim($db->real_escape_string($spreadSheetAry[$i][4])));
            }
            $email = "";
            if (isset($spreadSheetAry[$i][5])) {
                $email = strtolower(trim($db->real_escape_string($spreadSheetAry[$i][5])));
            }
            $mobile = "";
            if (isset($spreadSheetAry[$i][6])) {
                $mobile = trim($db->real_escape_string($spreadSheetAry[$i][6]));
            }
            $area = "";
            if (isset($spreadSheetAry[$i][7])) {
                $area = trim($db->real_escape_string($spreadSheetAry[$i][7]));
            }
            $city = "";
            if (isset($spreadSheetAry[$i][8])) {
                $city = trim($db->real_escape_string($spreadSheetAry[$i][8]));
            }
            $district = "";
            if (isset($spreadSheetAry[$i][9])) {
                $district = trim($db->real_escape_string($spreadSheetAry[$i][9]));
            }
            $state = "";
            if (isset($spreadSheetAry[$i][10])) {
                $state = trim($db->real_escape_string($spreadSheetAry[$i][10]));
            }
            $coordinator = "";
            if (isset($spreadSheetAry[$i][11])) {
                $coordinator = trim($db->real_escape_string($spreadSheetAry[$i][11]));
            }
            $address1 = $area;
            $address2 = !empty($area) ? ', ' . $city . ', ' : $city;
            $address3 = !empty($city) ? ', ' . $district : $district;
            $address4 = !empty($district) ? ', ' . $state . ', ' : $state;

            $check_email = $db->count('students','*',"Email = '$email'");           
            if (!empty($email) && $check_email == 0) {
                $location_data = array(
                    'FullName' =>  $fullname,
                    'Email' => $email,
                    'Mobile' => $mobile,
                    'Gender' => $gender,
                    'Country' => 'IND',
                    'Password' => hash('sha256', 'learn@help'),
                    'State' => $state,
                    'District' => $district,
                    'City' => $city,
                    'Area' => $area,
                    'Address' => $address1 . $address2 . $address3 . $address4,
                    'School' => $school,
                    'Class' => $class,
                    'Coordinator' => $coordinator,
                    'isActive' => 'Yes',
                    'Status' => 'Active',
                    'CreatedAt' => $core->datetime
                );
                $student_id = $db->add('students', $location_data);
            }
            if ($student_id > 0) {
                $student_update = $db->update('students',array('UniqueID'=>'NLP'.sprintf('%06d',$student_id)),"ID=$student_id");
                $completed = true;
            }
        }
        if ($completed === true) {
            $request->meta = [
                "error" => false,
                "message" => 'Students Data Successfully Uploaded.'
            ];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Some error occured while uploading data.'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing.'
        ];
    }
}
echo json_encode($request);
