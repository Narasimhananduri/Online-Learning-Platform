<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;

require('../vendor/autoload.php');

require('../inc/core.php');
$mail = new PHPMailer();
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
$condition = "(cp.CreatedOn < NOW() - INTERVAL 10 DAY) AND (s.isActive='Yes') AND (s.Status='Active') AND (cp.StudentID NOT IN (SELECT DISTINCT StudentID FROM `reminders` WHERE CreatedAt > NOW() - INTERVAL 10 DAY))";
$join_array = array(
    array(
        "type" => 'LEFT JOIN',
        'table' => 'students',
        'as' => 's',
        "on" => 's.ID=cp.StudentID'
    ),
);

$response = $db->join_all('course_progress', 'cp', "cp.StudentID,cp.CourseID,s.FullName,s.Email", $join_array, $condition,"","","cp.StudentID");
// $total = $db->join_count('course_progress', 'cp', "cp.ID", $join_array, $condition);
var_dump($response);
if (!empty($response)) {
    foreach ($response as $key => $value) {
        $course_link = $db->get('courses', "Slug", "ID='" . $value['CourseID'] . "'");
        $reminder_data = array(
            "StudentID" => $value['StudentID'],
            'Link' => "https://learn.help.org/courses/" . $course_link['Slug'],
            "CreatedAt" => $core->datetime
        );
        $add_reminder = $db->add("reminders", $reminder_data);

        // configure an SMTP
        $mail->isSMTP();
        $mail->Host = $core::SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = $core::SMTP_USERNAME;
        $mail->Password = $core::SMTP_PASSWORD;
        $mail->SMTPSecure = 'ssl';
        $mail->Port = $core::SMTP_PORT;

        $mail->setFrom($core::SMTP_MAIL, $core->site_title);
        $mail->addAddress($value['Email'], 'Me');
        $mail->Subject = 'Reminder from Help Learning Platform';
        // Set HTML 
        $mail->isHTML(TRUE);
        $mail->Body = '<!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
          <head>
            <title></title>
            <meta charset="utf-8" />
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso
              ]><xml
                ><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG /></o:OfficeDocumentSettings></xml
            ><![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
            <!--<![endif]-->
            <style>
              * {
                box-sizing: border-box;
              }
        
              body {
                margin: 0;
                padding: 0;
              }
        
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }
        
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }
        
              p {
                line-height: inherit;
              }
        
              @media (max-width: 620px) {
                .icons-inner {
                  text-align: center;
                }
        
                .icons-inner td {
                  margin: 0 auto;
                }
        
                .row-content {
                  width: 100% !important;
                }
        
                .image_block img.big {
                  width: auto !important;
                }
        
                .stack .column {
                  width: 100%;
                  display: block;
                }
              }
            </style>
          </head>
          <body style="background-color: #d9dffa; margin: 0; padding: 50px 0; -webkit-text-size-adjust: none; text-size-adjust: none">
            <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px" width="600">
                              <tbody>
                                <tr>
                                  <td
                                    class="column"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px"
                                    width="100%"
                                  >
                                    <table border="0" cellpadding="0" cellspacing="0" class="empty_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt" width="100%">
                                      <tr>
                                        <td>
                                          <div></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-2"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-position: top center; background-repeat: repeat"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px" width="600">
                              <tbody>
                                <tr>
                                  <td
                                    class="column"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      padding-left: 50px;
                                      padding-right: 50px;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word" width="100%">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #506bec; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
                                              <div style="margin: 30px 0px;line-height: 10px">
                                                <a href="https://learn.help.org/" style="outline: none" tabindex="-1" target="_blank"
                                                  ><img alt="Your Logo" src="https://learn.help.org/logo.png" style="display: block; height: auto; border: 0; width: 300px; max-width: 100%" title="Your Logo" width="145"
                                                /></a>
                                              </div>
                                              <p style="margin: 1; font-size: 14px">
                                                <b><span style="font-size: 30px">Hi '.$value["FullName"].'!</span></b>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word" width="100%">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
                                              <p style="margin: 0; font-size: 14px"><span style="font-size: 16px">From past 7 days your are inactive in the coding course please continue by clicking the Continue button below.</span></p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word" width="100%">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
                                              <p style="margin: 0; font-size: 14px"><span style="font-size: 16px">Let’s go !</span></p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt" width="100%">
                                      <tr>
                                        <td style="padding-bottom: 20px; padding-left: 10px; padding-right: 10px; padding-top: 20px; text-align: left">
                                          <a
                                            href="https://learn.help.org/courses/'.$course_link["Slug"].'"
                                            style="
                                              text-decoration: none;
                                              display: inline-block;
                                              color: #ffffff;
                                              background-color: #506bec;
                                              border-radius: 16px;
                                              width: auto;
                                              border-top: 0px solid TRANSPARENT;
                                              border-right: 0px solid TRANSPARENT;
                                              border-bottom: 0px solid TRANSPARENT;
                                              border-left: 0px solid TRANSPARENT;
                                              padding-top: 8px;
                                              padding-bottom: 8px;
                                              font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                                              text-align: center;
                                              mso-border-alt: none;
                                              word-break: keep-all;
                                            "
                                            target="_blank"
                                            ><span style="padding-left: 25px; padding-right: 20px; font-size: 15px; display: inline-block; letter-spacing: normal"
                                              ><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px"
                                                ><span data-mce-style="font-size: 15px; line-height: 30px;" style="font-size: 15px; line-height: 30px"><b>CONTINUE</b></span></span
                                              ></span
                                            ></a
                                          >
                                          <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word" width="100%">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
                                              <p style="margin: 0; font-size: 14px">
                                                <span style="font-size: 14px">Having trouble? Visit this link : <a href="https://learn.help.org/courses/'.$course_link["Slug"].'">https://learn.help.org/courses/'.$course_link["Slug"].'</a> </span>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word" width="100%">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif">
                                              <p style="margin: 0; font-size: 14px">If you are active. You can ignore this message.</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End -->
          </body>
        </html>
        ';

        if (!$mail->send()) {
            // echo 'Message could not be sent.';
            // echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            // echo 'Message has been sent';
        }
    }
}
