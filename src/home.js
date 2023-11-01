
import './App.css';

import './home.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';





const Home = () => {
    return (
        <div className='home-container'>

            <ul class="accordion">
                <li>
                    <input type='radio' name='accordion' id='first' />
                    <label for="first">Root of Equation</label>
                    <div class="content">
                        <p>
                            Roots of Equations
                            Algorithm ที่ใช้ในการหาราก หรือ Root ของ Function โดยที่เราจะกล่าวเฉพาะ Function ที่ ประกอบด้วยหนึ่งตัวแปรเท่านั้น ซึ่งเขียนได้ในรูปของ y = f(x) และรากของ Function f (x) สามารถหาได้จากการแก้ สมการ f (x) = 0
                            พึงเข้าใจว่ารากของสมการอาจจะมีได้มากกว่าหนึ่งตัว และอาจจะมีรากที่ซ้ํากันได้หรือที่เรียก Multiple Roots อย่างไรก็ ตาม ในการศึกษาขั้นต้นนี้ เราจะสมมุติว่า Root ทุกตัวจะมีค่าไม่ซ้ํากัน และเราพอจะรู้ว่ารากที่เราต้องการอยู่ที่บริเวณไหน(การ หาค่าประมาณของรากของสมการสามารถทําได้โดยการ Plot Graph และดูที่เมื่อไรเส้น f (x) ตัดกับแกน x หรือมีค่าเท่ากับ
                            ศูนย์)
                        </p>

                    </div>
                </li>

                <li>
                    <input type='radio' name='accordion' id='second' />
                    <label for="second">Linear Algebra</label>
                    <div class="content">
                        <p>
                            Linear Algebra
                            เป็นเทคนิคและเทคโนโลยีที่ใช้การคำนวณเชิงตัวเลขเพื่อแก้ปัญหา
                            ที่เกี่ยวข้องกับแมตริกซ์และเวกเตอร์ในการวิเคราะห์ข้อมูลและการแก้
                            ปัญหาทางคณิตศาสตร์ที่เกี่ยวข้องกับอยู่ในรูปแบบเชิงเส้น
                        </p>

                    </div>
                </li>

                <li>
                    <input type='radio' name='accordion' id='third' />
                    <label for="third">Interpolation</label>
                    <div class="content">
                        <p>
                            Interpolation (การหาค่าตรง) เป็นกระบวนการทางคณิตศาสตร์และการคำนวณที่ใช้เพื่อคำนวณค่าระหว่างค่าที่ทราบอยู่หรือค่าที่มีอยู่ในชุดข้อมูล. การหาค่าระหว่างจุดที่รู้มากจากข้อมูลที่มีอาจมีประโยชน์ในการสร้างฟังก์ชันหรือค่าประมาณในบริบทที่ไม่มีข้อมูลที่เป็นค่าตรง. การจำลองค่าระหว่างจุดที่ทราบมาเรียกว่า interpolation points หรือ data points.
                        </p>

                    </div>
                </li>

                <li>
                    <input type='radio' name='accordion' id='four' />
                    <label for="four">Least Square</label>
                    <div class="content">
                        <p>

                            Least squares (ค่าเฉลี่ยแกรม) เป็นเทคนิคทางคณิตศาสตร์ที่ใช้ในการหาค่าพารามิเตอร์ที่เหมาะสมที่สุด (best-fit parameters) ในโมเดลที่เป็นอนุพันธ์ของข้อมูลที่มีความคลาดเคลื่อน (errors) โดยลดความคลาดเคลื่อนรวมของโมเดลนั้น ๆ ให้น้อยที่สุด.


                        </p>

                    </div>
                </li>

                <li>
                    <input type='radio' name='accordion' id='five' />
                    <label for="five">Integration</label>
                    <div class="content">
                        <p>การอินทิเกรชัน (Integration) เป็นกระบวนการทางคณิตศาสตร์ที่ใช้ในการหาพื้นที่ใต้กราฟของฟังก์ชันหรือค่ารวมของฟังก์ชันบนระบบส่วนหนึ่งของช่วงค่าหนึ่ง นอกจากนี้ยังใช้เพื่อหาค่าประเมิน, ค่าคล้ายคลึง, การคำนวณอัตราการเปลี่ยนแปลง, และแก้ปัญหาคณิตศาสตร์อื่น ๆ</p>

                    </div>
                </li>

                <li>
                    <input type='radio' name='accordion' id='six' />
                    <label for="six">Differences</label>
                    <div class="content">
                        <p>

                            การดิฟเรขาคณิต (Differential Calculus) เป็นหนึ่งในวิธีการของคณิตศาสตร์ที่เกี่ยวกับการคำนวณอนุพันธ์ของฟังก์ชัน หรือคำนวณอัตราการเปลี่ยนแปลงของค่าเมื่อค่านั้นมีการเปลี่ยนแปลง. การดิฟเป็นหนึ่งในสาขาหลักของคณิตศาสตร์ที่ใช้ในการแก้ปัญหาทางวิทยาศาสตร์และวิศวกรรมและมีบทบาทสำคัญในการจำลองและการทำนายความเปลี่ยนแปลงของตัวแปรต่าง ๆ ในสถานการณ์ต่าง ๆ
                        </p>

                    </div>
                </li>


            </ul>

         


        </div>

    );
}

export default Home;
