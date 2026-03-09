<?php
namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topics = [
        ['title' => 'Scrum in 10 minutes', 'url' => 'https://www.youtube.com/watch?v=cJH0xlFR3Qs', 'path' => 'General', 'category' => 'Scrum'],
        ['title' => 'Introduction to Scrum [Arabic]', 'url' => 'https://www.youtube.com/watch?v=xoNlhLAKly4', 'path' => 'General', 'category' => 'Scrum'],
        ['title' => 'The Scrum Guide', 'url' => 'https://www.scrum.org/resources/scrum-guide', 'path' => 'General', 'category' => 'Scrum'],
        ['title' => 'Scrum Open assessment', 'url' => 'https://www.scrum.org/open-assessments/scrum-open', 'path' => 'General', 'category' => 'Scrum'],
        ['title' => 'GitHub Playlist', 'url' => 'https://www.youtube.com/watch?v=Z6C35WqawGs', 'path' => 'General', 'category' => 'Git'],
        ['title' => 'How to Write a Git Commit Message', 'url' => 'https://chris.beams.io/git-commit', 'path' => 'General', 'category' => 'Git'],
        ['title' => 'JavaScript Course', 'url' => 'https://www.youtube.com/watch?v=2EAV2cB3FWY', 'path' => 'FrontEnd', 'category' => 'JavaScript & React'],
        ['title' => 'React Course', 'url' => 'https://www.youtube.com/playlist?list=PLYyqC4bNbCIdSZ-JayMLl4WO2Cr995vyS', 'path' => 'FrontEnd', 'category' => 'JavaScript & React'],
        ['title' => 'SQL 101', 'url' => 'https://satr.tuwaiq.edu.sa/course/FtkmhtJpQW/view', 'path' => 'BackEnd', 'category' => 'SQL Database'],
        ['title' => 'SQL 102', 'url' => 'https://satr.tuwaiq.edu.sa/course/APjgdQqVWR/view', 'path' => 'BackEnd', 'category' => 'SQL Database'],
        ['title' => 'SQL 103', 'url' => 'https://satr.tuwaiq.edu.sa/course/bOXiOFzkMv/view', 'path' => 'BackEnd', 'category' => 'SQL Database'],
        ['title' => 'Normalization in DBMS (article)', 'url' => 'https://www.datacamp.com/tutorial/normalization-in-dbms', 'path' => 'BackEnd', 'category' => 'SQL Database'],
        ['title' => 'PHP for Beginners', 'url' => 'https://laracasts.com/series/php-for-beginners-2023-edition', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'PHP (EXTRA)', 'url' => 'https://laracasts.com/series/php8-crash-course', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'OOP 1', 'url' => 'https://www.youtube.com/watch?v=fK2lLVqc8UY', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'OOP 2', 'url' => 'https://www.youtube.com/watch?v=qP9-3LnMZsE', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'OOP 3', 'url' => 'https://www.youtube.com/watch?v=dW4WhJZB99U', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'OOP 4', 'url' => 'https://www.youtube.com/watch?v=1XE_cfonjXU', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'Larael Framework (SATR IN ARABIC)', 'url' => 'https://satr.tuwaiq.edu.sa/course/lgdjP05YC9/view?course_path_id=qmgnjLVsLA', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ['title' => 'Larael Framework', 'url' => 'https://laracasts.com/series/30-days-to-learn-laravel-11', 'path' => 'BackEnd', 'category' => 'PHP & Laravel'],
        ]; 
        DB::table('topics')->insert($topics);
    }}


