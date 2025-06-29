UPDATE public."Product"
SET name = 'Micro Infusion System Bundle + 3 Serums + 2 Needles'
WHERE id = 2;

UPDATE public."Product"
SET description = $$
Includes :
(1) Micro Infusion System
(3) Anti-Aging Serums
(2) Sterile Needle Heads
$$
WHERE id = 2;

UPDATE public."Product"
SET image = '/micro/1+3.png'
WHERE id = 2;


UPDATE public."Product"
SET detail = $$
<!-- How It Works Section -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <!-- 左边图片 -->
    <div class="flex justify-center">
        <img src="/micro/4+12.jpg" alt="Image 2" class="max-w-full h-auto max-h-96 rounded-lg shadow-md object-contain" />
    </div>

    <!-- 右边内容 -->
    <div class="space-y-4 flex flex-col justify-center">
        <h1 class="text-3xl font-bold text-center">The Magic Behind Microinfusion</h1>
        <h2 class="text-xl text-center">How it Works?</h2>

        <p>The Micro-Infusion System achieves its exceptional effectiveness through stimulation and infusion.</p>

        <p>First, it delicately "stamps" the skin with 24K gold 0.25mm clinical-grade needles, inducing controlled trauma.
            This prompts increased collagen production, naturally improving elasticity and diminishing fine lines and wrinkles.</p>
        <p>The needles, finer than human hair, guarantee a virtually pain-free procedure.</p>

        <p>Next, invisible micro-channels "infuse" your selected clinically-formulated serums into the skin's surface,
            amplifying absorption by up to 300%, resulting in visible improvements.</p>
    </div>
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/1.jpg" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/2.jpg" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/3.jpg" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/4.jpg" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<!-- How to Use Section -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <!-- 左边图片 -->
    <div class="flex justify-center">
        <img src="/micro/4+12.jpg" alt="Microinfusion Device" class="w-120 h-120 rounded-lg shadow-md object-cover" />
    </div>

    <!-- 右边内容 -->
    <div class="space-y-6 flex flex-col justify-center">
        <h1 class="text-3xl font-bold text-center">How to use</h1>
        <p class="text-xl text-center">5 Minutes Total, Every 2-4 Weeks</p>

        <!-- 步骤列表 -->
        <div class="space-y-6">
            <!-- Step 1 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">1</span>
                </div>
                <div>
                    <p class="font-bold">STEP 1</p>
                    <p>Twist open the chamber of the device and fill with one ampule of serum. Twist to close it tight. Optional: You can mix two serums and fill it until it’s 3/4 full.</p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">2</span>
                </div>
                <div>
                    <p class="font-bold">STEP 2</p>
                    <p>Once the serum has had enough time to make its way into the needles, you can take off the lid and start microinfusing!</p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">3</span>
                </div>
                <div>
                    <p class="font-bold">STEP 3</p>
                    <p>Start at the centre of the face and work your way outward to cover the full face. Stamp with a 50% overlap. Repeat 2-3 passes for better results. Leave the serum on overnight so your skin can drink up all those skin-enhancing ingredients.</p>
                </div>
            </div>
        </div>
    </div>
</div>
$$
WHERE id = 1;