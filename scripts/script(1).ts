// load basic elemets
import Scene from 'Scene';
import Diagnostics from 'Diagnostics';
import Reactive from 'Reactive';
import CameraInfo from 'CameraInfo';
import Blocks from 'Blocks';
import Time from 'Time';
import Patches from 'Patches';
import Persistence from 'Persistence';
import FaceTracking from 'FaceTracking';
import FaceGestures from 'FaceGestures';

//load others
import Materials from 'Materials';
import Textures from 'Textures';
import Animation from 'Animation';
import NativeUI from 'NativeUI';
import Audio from "Audio";


(async function () {  // Enables async/await in JS [part 1]

    //==============================================================================
    //Dynamically Instantiating Objects and materails
    const scene = Scene.root;
    const face = FaceTracking.face(0);
    const [surpriseleft,
        angryleft,
        okleft,
        happyleft,
        surpriseright,
        angryright,
        okright,
        happyright,
        surpriseText,
        angryText,
        okText,
        happyText,
        surpriseKey, 
        angryKey, 
        okKey, 
        happyKey,
        surpriseBlur1, 
        angryBlur1, 
        okBlur1, 
        happyBlur1,
        surpriseBlur2, 
        angryBlur2, 
        okBlur2, 
        happyBlur2,
        surpriseBlur3, 
        angryBlur3, 
        okBlur3, 
        happyBlur3,
        surpriseBlur4, 
        angryBlur4, 
        okBlur4, 
        happyBlur4,
        cameraPlatformItems,
        frontCameraPlatform, 
        backCameraplatform, 
        frontCameraScoreText, 
        teethUpper,
        teethLower,
        noseLeft,
        noseRight,
        nose,
        noseBack,
        cheekLeft,
        cheekRight,
        jaw,
        headBack,
        headLeft,
        headRight,
        head,
        earLeft,
        earRight,
        eyeBack,
        faceLeft,
        faceRight,
        progressBar, 
        fireStatus
        ] = await Promise.all([
        
        //music plane
        scene.findFirst('surpriseleft'),
        scene.findFirst('angryleft'),
        scene.findFirst('okleft'),
        scene.findFirst('happyleft'),
        scene.findFirst('surpriseright'),
        scene.findFirst('angryright'),
        scene.findFirst('okright'),
        scene.findFirst('happyright'),

        //introduction text
        scene.findFirst('surpriseText'),
        scene.findFirst('angryText'),
        scene.findFirst('okText'),
        scene.findFirst('happyText'),
      
        //hit key points and blur
        Scene.create("Plane", {
            "name": "surpriseKey",
        }),
        Scene.create("Plane", {
            "name": "angryKey",
        }),
        Scene.create("Plane", {
            "name": "okKey",
        }),
        Scene.create("Plane", {
            "name": "happyKey",
        }),

        Scene.create("Plane", {
            "name": "surpriseKeyBlur1",
        }),
        Scene.create("Plane", {
            "name": "angryKeyBlur1",
        }),
        Scene.create("Plane", {
            "name": "okKeyBlur1",
        }),
        Scene.create("Plane", {
            "name": "happyKeyBlur1",
        }),
        Scene.create("Plane", {
            "name": "surpriseKeyBlur2",
        }),
        Scene.create("Plane", {
            "name": "angryKeyBlur2",
        }),
        Scene.create("Plane", {
            "name": "okKeyBlur2",
        }),
        Scene.create("Plane", {
            "name": "happyKeyBlur2",
        }),
        Scene.create("Plane", {
            "name": "surpriseKeyBlur3",
        }),
        Scene.create("Plane", {
            "name": "angryKeyBlur3",
        }),
        Scene.create("Plane", {
            "name": "okKeyBlur3",
        }),
        Scene.create("Plane", {
            "name": "happyKeyBlur3",
        }),
        Scene.create("Plane", {
            "name": "surpriseKeyBlur4",
        }),
        Scene.create("Plane", {
            "name": "angryKeyBlur4",
        }),
        Scene.create("Plane", {
            "name": "okKeyBlur4",
        }),
        Scene.create("Plane", {
            "name": "happyKeyBlur4",
        }),

        //container for all items
        Scene.create("SceneObject", {
            "name": "cameraPlatformItems",
        }),

        scene.findFirst('frontCameraPlatform'),
        scene.findFirst('backCameraPlatform'),

        scene.findFirst('scoreTextFront'),


        //get skull components
        scene.findFirst('Upper_teeth'),
        scene.findFirst('Lower_teeth'),
        scene.findFirst('Nose_left'),
        scene.findFirst('Nose_right'),
        scene.findFirst('Nose'),
        scene.findFirst('Nose_back'),
        scene.findFirst('Cheek_left'),
        scene.findFirst('Cheek_right'),
        scene.findFirst('Jaw'),
        scene.findFirst('Head_back'),
        scene.findFirst('Head_left'),
        scene.findFirst('Head_right'),
        scene.findFirst('Head'),
        scene.findFirst('Ear_left'),
        scene.findFirst('Ear_right'),
        scene.findFirst('Eye_back'),
        scene.findFirst('Face_left'),
        scene.findFirst('Face_right'),

        //level related
        scene.findFirst('progressBar'),

        scene.findFirst('status'),
    ]);

    //get all materials
    const [surprisePlaneMat,
        angryPlaneMat,
        okPlaneMat,
        happyPlaneMat, 
        surpriseMaterial, 
        surpriseBlur, 
        angryMaterial, 
        angryBlur, 
        okMaterial, 
        okBlur, 
        happyMaterial, 
        happyBlur,
        backgroundMat,
        userbgMat
        ] = await Promise.all([

        Materials.findFirst("FP_surprise"),
        Materials.findFirst("FP_angry"),
        Materials.findFirst("FP_ok"),
        Materials.findFirst("FP_happy"),
        Materials.findFirst("surpriseMaterial"),
        Materials.findFirst("surpriseKeyBlur"),
        Materials.findFirst("angryMaterial"),
        Materials.findFirst("angryKeyBlur"),
        Materials.findFirst("okMaterial"),
        Materials.findFirst("okKeyBlur"),
        Materials.findFirst("happyMaterial"),
        Materials.findFirst("happyKeyBlur"),
        Materials.findFirst("HiresSphere_mat"),
        Materials.findFirst("userMaterial"),
        
    ]);

    const [l1, l2, l3, l4, l2Lock, l3Lock, l4Lock]  = await Promise.all([
        Textures.findFirst('l1Texture'),
        Textures.findFirst('l2Texture'),
        Textures.findFirst('l4Texture'),
        Textures.findFirst('l3Texture'),
        Textures.findFirst('l2Lock'),
        Textures.findFirst('l4Lock'),
        Textures.findFirst('l3Lock'),
    ]) ;
    

    let [isRecording] = await Promise.all([
        Patches.outputs.getBoolean("recording"),
    ]);

    const [unlockPlayback] = await Promise.all([
        Audio.getAudioPlaybackController('unlockAudioPlaybackController'),
    ]);

    //==============================================================================
    //practicle defination
    //==============================================================================
    
    (fireStatus as ParticleSystem).hsvaColorModulationModifier = Animation.samplers.HSVA([
        Animation.samplers.constant(1),
        Animation.samplers.constant(1),
        Animation.samplers.constant(1),
        Animation.samplers.easeInQuad(1, 0)

    ]);
    (fireStatus as ParticleSystem).sizeModifier = Animation.samplers.easeInCirc(0, 0.01);

    //==============================================================================
    //Persistence variables to store the face data flags, and game start falg 
    //==============================================================================

    const userScope = Persistence.userScope;

    //store the data
    //level data, initialize skull needs 4 parts flag. All the flag passes, game can start
    let data: {
        level: number,
        surprisePass1: boolean,
        surprisePass2: boolean,
        surpriseGet : boolean,
        angryPass1: boolean,
        angryPass2: boolean,
        angryGet : boolean,
        okPass1: boolean,
        okPass2: boolean,
        okGet : boolean,
        happyPass1: boolean,
        happyPass2: boolean,
        happyGet : boolean,
        gameSpawned: boolean,
        totalScore: number,
     
    } = {
        level: 0,
        surprisePass1: false,
        surprisePass2: false,
        surpriseGet : false,
        angryPass1: false,
        angryPass2: false,
        angryGet : false,
        okPass1: false,
        okPass2: false,
        okGet : false,
        happyPass1: false,
        happyPass2: false,
        happyGet : false,
        gameSpawned: false,
        totalScore: 0,
    };

    try{
        userScope.set('data', data);

    }catch (error) {
        Diagnostics.log('Failed to store data, ' + error);
    };

    

    //==============================================================================
    //normal var 

    //max level user can unlock
    let maxLevelUnlock = 0;

    //check user is using front or back camera
    let frontCamera = false;

    //determine when to instantiate objects
    let instantiated = false;

    //scoreText is the score
    let scoreText = frontCameraScoreText;


    //==============================================================================
    //Native UI variables set as level buttons

    //store reference to Native UI
    const picker = NativeUI.picker;

    //level define
    let currentSelectedIndex = 0;

    var configuration: {
        items: {
            image_texture: ImageTexture;
        }[];
        selectedIndex: number;
    } = {
        items: [
            {image_texture: l1 as ImageTexture},
            {image_texture: l2Lock as ImageTexture},
            {image_texture: l3Lock as ImageTexture},
            {image_texture: l4Lock as ImageTexture},
        ],
        selectedIndex: 0,
    };

    //level icons to be used later to replace the lock texture
    let levelIcons = [l1, l2, l3, l4];
    
    //==============================================================================
    //define progressBar based on score

    let progressBarDriverParameters: {
        durationMilliseconds: number,
        loopCount: number,
        mirror: boolean
    } = {
        durationMilliseconds: 0,
        loopCount: 1,
        mirror: false
    }
    let progressBarDrivers: TimeDriver;
    let progressBarSampler: ScalarSampler;

    //current score
    let scoreTextValue = 0;

    //==============================================================================
    //define times for playing game use

    //interval timer used to track time
    let intervalTimer;

    //time elapsed since started recording
    let timeNow = 0;

    //string time, used to match json
    let currentTime: string;

    //==============================================================================
    //fetch data from stored

    try {
        const result: any = await userScope.get('data');
        //assign
        maxLevelUnlock = parseInt(result.level.toString());

        //loop all items of picker and assign icons
        for(let i = 0; i <= result['level']; i++){
            configuration.items[i] = {image_texture: levelIcons[i]};
        };
    } catch (error) {
        //erroe return 0
        Diagnostics.log('Failed to retrieve data, ' + error);
    };

    await picker.configure(configuration);


    //==============================================================================
    //Bind face data to skull and set monitors for game play
    //==============================================================================

    //define background fade in animation

    let backgroundDriverParameters: {
        durationMilliseconds: number,
        loopCount: number,
        mirror: boolean
    } = {
        durationMilliseconds: 2500,
        loopCount: 1,
        mirror: false
    }
    let backgroundDrivers = Animation.timeDriver(backgroundDriverParameters);
    let backgroundSampler1 = Animation.samplers.linear(0, 0.25);
    let backgroundSampler2 = Animation.samplers.linear(0.25, 0.5);
    let backgroundSampler3 = Animation.samplers.linear(0.5, 0.75);
    let backgroundSampler4 = Animation.samplers.linear(0.75, 0.95);



    const Shoot = Reactive.val(1);


    //surprise ----represent eyebrow Raise
    let hasSurprise = FaceGestures.hasEyebrowsRaised(face);

    let surpriseHead =(await (head as Mesh).getBlendShapes())[1];
    let surpriseHeadBack = (await (headBack as Mesh).getBlendShapes())[0];
    let surpriseNoseLeft = (await (noseLeft as Mesh).getBlendShapes())[2];
    let surpriseNoseRight = (await (noseRight as Mesh).getBlendShapes())[2];
    let surprisecheekLeft = (await (cheekLeft as Mesh).getBlendShapes())[3];
    let surprisecheekRight = (await (cheekRight as Mesh).getBlendShapes())[3];
    let surpriseheadLeft = (await (headLeft as Mesh).getBlendShapes())[1];
    let surpriseheadRight = (await (headRight as Mesh).getBlendShapes())[1];
    let surpriseearLeft = (await (earLeft as Mesh).getBlendShapes())[3];
    let surpriseearRight = (await (earRight as Mesh).getBlendShapes())[3];
    let surpriseeyeBack = (await (eyeBack as Mesh).getBlendShapes())[0];
    let surprisenose = (await (nose as Mesh).getBlendShapes())[1];


    surpriseHead.weight = face.leftEyebrow.top.y;
    surpriseHeadBack.weight = face.leftEyebrow.top.y;
    surpriseheadRight.weight = face.leftEyebrow.top.y
    surpriseNoseLeft.weight = face.leftEyebrow.top.y
    surpriseNoseRight.weight = face.leftEyebrow.top.y
    surprisecheekLeft.weight = face.leftEyebrow.top.y
    surpriseheadLeft.weight = face.leftEyebrow.top.y
    surpriseheadRight.weight = face.leftEyebrow.top.y
    surpriseearLeft.weight = face.leftEyebrow.top.y
    surpriseearRight.weight = face.leftEyebrow.top.y
    surpriseeyeBack.weight = face.leftEyebrow.top.y
    surprisenose.weight = face.leftEyebrow.top.y

    //totutriol 1: let user raise eyebrow, to update personalized weight
    let setUp1 = hasSurprise.monitor().subscribeWithSnapshot( {
        'surpriseHead':surpriseHead.weight,
        'surpriseHeadBack':surpriseHeadBack.weight,
        'surpriseNoseLeft':surpriseNoseLeft.weight,
        'surpriseNoseRight':surpriseNoseRight.weight,
        'surprisecheekLeft':surprisecheekLeft.weight,
        'surprisecheekRight':surprisecheekRight.weight,
        'surpriseheadLeft':surpriseheadLeft.weight,
        'surpriseheadRight':surpriseheadRight.weight,
        'surpriseearLeft':surpriseearLeft.weight,
        'surpriseearRight':surpriseearRight.weight,
        'surpriseeyeBack':surpriseeyeBack.weight,
        'surprisenose':surprisenose.weight,
      
    }, function(event, snapshot ){
        //only when without data will run the function
        if(!(data.surprisePass1 && data.surprisePass2)){
            if (event.newValue ){ 
                //update flag
                try { 
                    data.surprisePass1 = true;
                    userScope.set('data', data);
                } catch( error ){
                    Diagnostics.log('Failed to store,' + error);
                };

                const tem = snapshot.surpriseHead 
                = snapshot.surpriseHeadBack 
                = snapshot.surpriseNoseLeft 
                = snapshot.surpriseNoseRight
                = snapshot.surprisecheekLeft
                = snapshot.surprisecheekRight
                = snapshot.surpriseheadLeft
                = snapshot.surpriseheadRight
                = snapshot.surpriseearLeft
                = snapshot.surpriseearRight
                = snapshot.surpriseeyeBack
                = snapshot.surprisenose;

                surpriseHead.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseHeadBack.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseNoseLeft.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseNoseRight.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surprisecheekLeft.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surprisecheekRight.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseheadLeft.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseheadRight.weight =Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseearLeft.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseearRight.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surpriseeyeBack.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
                surprisenose.weight = Reactive.smoothStep( face.leftEyebrow.top.y, Reactive.val(tem - 0.002), Reactive.val(tem + 0.0025) );
    
            } else {    
                //update flag 
                try {
                    data.surprisePass2 = true; 
                    
                    userScope.set('data', data);
                } catch( error ){
                    Diagnostics.log('Failed to store,' + error);
                };
          
            } 
            
        } else {
        
            if(!data.surpriseGet){    
                userbgMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler1) as ScalarSignal;
                backgroundMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler1) as ScalarSignal;
                surprisePlaneMat.opacity = Reactive.val(1);
                
               // head.hidden = Reactive.val(false);
                headBack.hidden = Reactive.val(false);
                headLeft.hidden = Reactive.val(false);
                headRight.hidden = Reactive.val(false);
                earLeft.hidden = Reactive.val(false);
                earRight.hidden = Reactive.val(false);

                surpriseText.hidden = Reactive.val(true);
                angryText.hidden = Reactive.val(false);

                try { 
                    data.surpriseGet = true;
                    userScope.set('data', data);
                } catch( error ){
                    Diagnostics.log('Failed to store,' + error);
                };
                setUp1.unsubscribe();
                
            } else return;
        }    
    });

    //

    //angry ----represent eyebrow frown
    let hasAngry = FaceGestures.hasEyebrowsFrowned(face);

    let angryTeethUpper = (await (teethUpper as Mesh).getBlendShapes())[2];
    let angryNoseLeft = (await (noseLeft as Mesh).getBlendShapes())[1];
    let angryNoseRight = (await (noseRight as Mesh).getBlendShapes())[1];
    let angrycheekLeft = (await (cheekLeft as Mesh).getBlendShapes())[2];
    let angrycheekRight = (await (cheekRight as Mesh).getBlendShapes())[2];
    let angryheadLeft = (await (headLeft as Mesh).getBlendShapes())[0];
    let angryheadRight = (await (headRight as Mesh).getBlendShapes())[0];
    let angryhead = (await (head as Mesh).getBlendShapes())[0];
    let angryearLeft = (await (earLeft as Mesh).getBlendShapes())[2];
    let angryearRight = (await (earRight as Mesh).getBlendShapes())[2];
    let angrynose = (await (nose as Mesh).getBlendShapes())[0];
    let angryfaceLeft = (await (faceLeft as Mesh).getBlendShapes())[2];
    let angryfaceRight = (await (faceRight as Mesh).getBlendShapes())[2];

    angryTeethUpper.weight = face.leftEyebrow.insideEnd.x;
    angryNoseLeft.weight = face.leftEyebrow.insideEnd.x;
    angryNoseRight.weight = face.leftEyebrow.insideEnd.x;
    angrycheekLeft.weight = face.leftEyebrow.insideEnd.x;
    angrycheekRight.weight = face.leftEyebrow.insideEnd.x;
    angryheadLeft.weight = face.leftEyebrow.insideEnd.x;
    angryheadRight.weight = face.leftEyebrow.insideEnd.x;
    angryhead.weight = face.leftEyebrow.insideEnd.x;
    angryearLeft.weight = face.leftEyebrow.insideEnd.x;
    angryearRight.weight = face.leftEyebrow.insideEnd.x;
    angrynose.weight = face.leftEyebrow.insideEnd.x;
    angryfaceLeft.weight = face.leftEyebrow.insideEnd.x;
    angryfaceRight.weight = face.leftEyebrow.insideEnd.x;

    //totutriol 2: let user frown eyebrows, to update personalized weight
    let setUp2 = hasAngry.monitor().subscribeWithSnapshot( {
        'angryTeethUpper':angryTeethUpper.weight,
        'angryNoseLeft': angryNoseLeft.weight,
        'angryNoseRight':angryNoseRight.weight,
        'angrycheekLeft':angrycheekLeft.weight,
        'angrycheekRight':angrycheekRight.weight,
        'angryheadLeft':angryheadLeft.weight,
        'angryheadRight':angryheadRight.weight,
        'angryhead':angryhead.weight,
        'angryearLeft':angryearLeft.weight,
        'angryearRight':angryearRight.weight,
        'angrynose': angrynose.weight,
        'angryfaceLeft':  angryfaceLeft.weight,
        'angryfaceRight': angryfaceRight.weight,
    }, function(event, snapshot ){
        //only when surprisePass will run the function
        if(data.surpriseGet){
            //only when without data will run the function
            if(!(data.angryPass1 && data.angryPass2)){

                if (event.newValue ){ 
                    //update flag
                    try { 
                        data.angryPass1 = true;
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
                    
                    const tem = snapshot.angryTeethUpper 
                    = snapshot.angryNoseLeft 
                    = snapshot.angryNoseRight
                    = snapshot.angrycheekLeft
                    = snapshot.angrycheekRight
                    = snapshot.angryheadLeft
                    = snapshot.angryheadRight
                    = snapshot.angryhead
                    = snapshot.angryearLeft
                    = snapshot.angryearRight
                    = snapshot.angryeyeBack
                    = snapshot.angrynose
                    = snapshot.angryfaceLeft
                    = snapshot.angryfaceRight;
                    
                    angryTeethUpper.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryNoseLeft.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryNoseRight.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angrycheekLeft.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angrycheekRight.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryheadLeft.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryheadRight.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryhead.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryearLeft.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryearRight.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angrynose.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem+0.0035) );
                    angryfaceLeft.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem+0.0012 ), Reactive.val(tem +0.0035) );
                    angryfaceRight.weight = Reactive.smoothStep( face.leftEyebrow.insideEnd.x, Reactive.val(tem +0.0012), Reactive.val(tem +0.0035) );
                            
                } else {    
                    //update flag 
                    
                    try {
                        data.angryPass2 = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
                } 
            } else {
                if(!data.angryGet){
                    userbgMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler2) as ScalarSignal;
                    backgroundMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler2) as ScalarSignal;
                    angryPlaneMat.opacity = Reactive.val(1);
                    
                    head.hidden = Reactive.val(false);
                    noseLeft.hidden = Reactive.val(false);
                    noseRight.hidden = Reactive.val(false);
                    nose.hidden = Reactive.val(false);
                    eyeBack.hidden = Reactive.val(false);
                    faceLeft.hidden = Reactive.val(false);
                    faceRight.hidden = Reactive.val(false);

                    angryText.hidden = Reactive.val(true);
                    okText.hidden = Reactive.val(false);
                    
                    try {
                        data.angryGet = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };

                    setUp2.unsubscribe();

                } else return;
            };

        } else return;
    });
   
     //ok ----represent smile cheek bone

     let hasSmiled = FaceGestures.isSmiling(face);

    let okTeethUpper = (await (teethUpper as Mesh).getBlendShapes())[1];
    let okTeethLower = (await (teethLower as Mesh).getBlendShapes())[1];
    let okcheekLeft = (await (cheekLeft as Mesh).getBlendShapes())[1];
    let okcheekRight = (await (cheekRight as Mesh).getBlendShapes())[1];
    let okjaw = (await (jaw as Mesh).getBlendShapes())[1];
    let okearLeft = (await (earLeft as Mesh).getBlendShapes())[1];
    let okearRight = (await (earRight as Mesh).getBlendShapes())[1];
    let okfaceLeft = (await (faceLeft as Mesh).getBlendShapes())[1];
    let okfaceRight = (await (faceRight as Mesh).getBlendShapes())[1];

    okTeethUpper.weight = face.leftCheek.cheekbone.y;
    okTeethLower.weight = face.leftCheek.cheekbone.y;
    okcheekLeft.weight = face.leftCheek.cheekbone.y;
    okcheekRight.weight = face.leftCheek.cheekbone.y;
    okjaw.weight = face.leftCheek.cheekbone.y;
    okearLeft.weight = face.leftCheek.cheekbone.y;
    okearRight.weight = face.leftCheek.cheekbone.y;
    okfaceLeft.weight = face.leftCheek.cheekbone.y;
    okfaceRight.weight = face.leftCheek.cheekbone.y;

     //totutriol 3: let user smile, move cheek, to update personalized weight
     let setUp3 = hasSmiled.monitor().subscribeWithSnapshot( {
        'okTeethUpper':okTeethUpper.weight,
        'okTeethLower': okTeethLower.weight,
        'okcheekLeft': okcheekLeft.weight,
        'okcheekRight':okcheekRight.weight,
        'okjaw':okjaw.weight,
        'okearLeft':okearLeft.weight,
        'okearRight': okearRight.weight,
        'okfaceLeft':okfaceLeft.weight,
        'okfaceRight':okfaceRight.weight,
    }, function(event, snapshot ){
        //only when surprisePass will run the function
        if(data.surpriseGet && data.angryGet){

            //only when without data will run the function
            if(!(data.okPass1 && data.okPass2)){
                if (event.newValue ){ 
                    //update flag
                    try { 
                        data.okPass1 = true;
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };

                    const tem = snapshot.okTeethUpper 
                    = snapshot.okTeethLower 
                    = snapshot.okcheekLeft
                    = snapshot.okcheekRight
                    = snapshot.okjaw
                    = snapshot.okearLeft
                    = snapshot.okearRight
                    = snapshot.okfaceLeft
                    = snapshot.okfaceRight
              
                    okTeethUpper.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okTeethLower.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okcheekLeft.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okcheekRight.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okjaw.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okearLeft.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okearRight.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okfaceLeft.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                    okfaceRight.weight = Reactive.smoothStep(  face.leftCheek.cheekbone.y, Reactive.val(tem - 0.0009), Reactive.val(tem + 0.0013) );
                } else {    
                    //update flag 
                    try {
                        data.okPass2 = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
 
                } 
            } else {
                if(!data.okGet){
                    userbgMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler3) as ScalarSignal;
                    backgroundMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler3) as ScalarSignal;
                    okPlaneMat.opacity = Reactive.val(1);
                    
                    cheekLeft.hidden = Reactive.val(false);
                    cheekRight.hidden = Reactive.val(false);
                    noseBack.hidden = Reactive.val(false);
                   
                    okText.hidden = Reactive.val(true);
                    happyText.hidden = Reactive.val(false);

                    try {
                        data.okGet = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };

                    setUp3.unsubscribe();
                } else return;
            };

        } else return;
    });


    //happy ----represent mouth oppeness **don't need to remap the weight values
    let mouth = face.mouth.openness;
    let hasHappy = mouth.gt(0.6);

    let minmouth = Reactive.val(0.0);
    let maxmouth = Reactive.val(0.65);

    let happyControl = Reactive.smoothStep(mouth, minmouth, maxmouth);

    let happyTeethUpper = (await (teethUpper as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyTeethLower = (await (teethLower as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyNoseLeft = (await (noseLeft as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyNoseRight = (await (noseRight as Mesh).getBlendShapes())[0].weight = happyControl;
    let happycheekLeft = (await (cheekLeft as Mesh).getBlendShapes())[0].weight = happyControl;
    let happycheekRight = (await (cheekRight as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyjaw = (await (jaw as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyearLeft = (await (earLeft as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyearRight = (await (earRight as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyfaceLeft = (await (faceLeft as Mesh).getBlendShapes())[0].weight = happyControl;
    let happyfaceRight = (await (faceRight as Mesh).getBlendShapes())[0].weight = happyControl;

    //totutriol 4: let user happy, open mouth, to finish game element instantiate
    let setUp4 = hasHappy.monitor().subscribe((event) => {
        if(data.surpriseGet && data.angryGet && data.okGet){
            if(!(data.happyPass1 && data.happyPass2)){
                if(event.newValue){
                    try {
                        data.happyPass1 = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
                } else {
                    try {
                        data.happyPass2 = true; 
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
                }

            } else {
                if(!data.happyGet){
                    userbgMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler4) as ScalarSignal;
                    backgroundMat.opacity = Animation.animate(backgroundDrivers, backgroundSampler4) as ScalarSignal;
                    happyPlaneMat.opacity = Reactive.val(1);
                    
                    jaw.hidden = Reactive.val(false);
                    teethLower.hidden = Reactive.val(false);
                    teethUpper.hidden = Reactive.val(false);
                   
                    happyText.hidden = Reactive.val(true);
                    //gameStartText.hidden = Reactive.val(false);

                    setUp4.unsubscribe();

                    picker.visible = Reactive.val(true);

                    try {
                        data.happyGet = true; 
                        data.gameSpawned = true;
                        userScope.set('data', data);
                    } catch( error ){
                        Diagnostics.log('Failed to store,' + error);
                    };
                    
                } else return;
            };
        } else return;

    });

    //happyControl.lt(Shoot)

    //==============================================================================
    //faceType define

    const faceType = {
        surprise: 0,
        angry: 1,
        ok: 2,
        happy: 3,
    };

    
    //==============================================================================
    //monitor changes of touching  pickers
    //==============================================================================
    
    picker.selectedIndex.monitor().subscribe(function(selectedIndex){
        //index of the new item
        currentSelectedIndex = selectedIndex.newValue;

        //value of levelPlayable is determined by the levels unlocked by user and sent to Patch
        Patches.inputs.setBoolean("levelPlayable", currentSelectedIndex <= maxLevelUnlock? true:false);
    });

    //changes to index of new selected item is sent to patch
    Patches.inputs.setScalar("currentLevel", picker.selectedIndex);



    //==============================================================================
    //level json
    //==============================================================================
    const levelJson  = {
        "level_1": {
            "duration" : 30000,
            "minscoreText":13,
            "0.0":["s"],
            "2.0":["s"],
            "4.0":["s"],
            "6.0":["s"],
            "7.5":["s"],
            "11.0":["s"],
            "11.5":["s"],
            "12.5":["s"],
            "13.0":["s"],
            "15.0":["s"],
            "15.5":["s"],
            "16.0":["s"],
            "19.5":["s"],
            "20.0":["s"],
            "20.5":["s"],
            "22.5":["s"],
            "24.0":["s"],
            "25.5":["s"],
        },
        "level_2": {
            "duration" : 28000,
            "minscoreText":11,
            "0.5":["s"],
            "1.5":["s"],
            "3.0":["a"],
            "4.5":["a"],
            "5.5":["a"],
            "7.0":["a"],
            "8.5":["a"],
            "10.0":["a"],
            "11.5":["a"],
            "12.5":["a"],
            "14.0":["s"],
            "15.5":["s"],
            "17.0":["s"],
            "18.0":["s"],
            "19.0":["s"],
            "21.0":["s"],
        },
        "level_3": {
            "duration" : 30000,
            "minscoreText":14,
            "2.5":["s"],
            "4.5":["o"],
            "5.5":["a"],
            "6.5":["a"],
            "7.0":["o"],
            "8.0":["s"],
            "9.5":["o"],
            "11.0":["a"],
            "12.0":["a"],
            "12.5":["o"],
            "13.0":["s"],
            "15.0":["o"],
            "16.0":["a"],
            "17.0":["a"],
            "17.5":["o"],
            "18.5":["s"],
            "20.0":["o"],
            "22.5":["o"],
            "23.0":["s"],
        },
        "level_4": {
            "duration" : 32000,
            "minscoreText":16,
            "1.0":["o"],
            "2.0":["o"],
            "3.0":["s"],
            "3.5":["a"],
            "4.5":["s"],
            "6.0":["s"],
            "7.0":["a"],
            "7.5":["s"],
            "9.0":["s"],
            "10.0":["a"],
            "10.5":["s"],
            "13.5":["o"],
            "15.0":["o"],
            "15.5":["a"],
            "16.0":["h"],
            "18.5":["a"],
            "19.0":["h"],
            "21.5":["a"],
            "22.5":["h"],
            "24.5":["a"],
            "25.5":["h"],
        }
    }


    //==============================================================================
    //Define beats rotation 

    //Blockanimation para
    const timeDriverParameters : {
        durationMilliseconds: number,
        loopCount: number,
        mirror: boolean
    } = {
        durationMilliseconds: 3000,
        loopCount: 1,
        mirror: false
    };
    
    const rotateSamplerL = Animation.samplers.linear(0, 180);
    const rotateSamplerR = Animation.samplers.linear(0, -180);

    //Arrys to store reusable beats
    //surprise
    const cubesL: Array< BlockSceneRoot> = [];
    const cubesR: Array< BlockSceneRoot> = [];

    //angry
    const othasL: Array< BlockSceneRoot> = [];
    const othasR: Array< BlockSceneRoot> = [];

    //ok
    const icosasL: Array< BlockSceneRoot> = [];
    const icosasR: Array< BlockSceneRoot> = [];

    //happy
    const donutsL: Array< BlockSceneRoot> = [];
    const donutsR: Array< BlockSceneRoot> = [];

    //==============================================================================
    //monitor isrecording? means playing games?
    //==============================================================================
    
    isRecording.monitor().subscribe(function(event) {
        //if(data.gameSpawned){
            Patches.inputs.setBoolean("levelPlayable", currentSelectedIndex <= maxLevelUnlock? true: false);
            //allow user to play if unlock the level
            if(currentSelectedIndex <= maxLevelUnlock){
                //start from recording
                if(event.newValue){

                    //====================================================================
                    //reset UI and music
                    unlockPlayback.setPlaying(false);
                    //reset score and picker
                    scoreTextValue = 0;
                    (scoreText as TextExtrusion).text = Reactive.val("00");
                    scoreText.hidden = Reactive.val(false);
                    picker.visible = Reactive.val(false);

                    surprisePlaneMat.opacity = Reactive.val(0);
                    angryPlaneMat.opacity = Reactive.val(0);
                    okPlaneMat.opacity = Reactive.val(0);
                    happyPlaneMat.opacity = Reactive.val(0);

                    //====================================================================
                    //progressBar and animation
                    progressBarDriverParameters.durationMilliseconds = levelJson["level_" + (currentSelectedIndex + 1)].duration;

                    progressBarDrivers = Animation.timeDriver(progressBarDriverParameters);
                    progressBarSampler = Animation.samplers.linear(100,0);
                    (progressBar as Canvas).width = Animation.animate(progressBarDrivers, progressBarSampler) as ScalarSignal;

                    progressBarDrivers.reset();
                    progressBar.hidden = Reactive.val(false);
                    progressBarDrivers.start();

                    //initialize time every time
                    timeNow = 0;

                    //====================================================================
                    //begin selected game

                    //init states
                    if(currentSelectedIndex == 0) {
                        surpriseMaterial.opacity = Reactive.val(1);
                        surprisePlaneMat.opacity = Reactive.val(0.2);
                    } else if(currentSelectedIndex == 1) {
                        surpriseMaterial.opacity = Reactive.val(1);
                        angryMaterial.opacity = Reactive.val(1);
                        surprisePlaneMat.opacity = Reactive.val(0.2);
                        angryPlaneMat.opacity = Reactive.val(0.2);
                    } else if(currentSelectedIndex == 2) {
                        surpriseMaterial.opacity = Reactive.val(1);
                        angryMaterial.opacity = Reactive.val(1);
                        okMaterial.opacity = Reactive.val(1);
                        surprisePlaneMat.opacity = Reactive.val(0.2);
                        angryPlaneMat.opacity = Reactive.val(0.2);
                        okPlaneMat.opacity = Reactive.val(0.2);
                    } else if(currentSelectedIndex == 3) {
                        surpriseMaterial.opacity = Reactive.val(1);
                        angryMaterial.opacity = Reactive.val(1);
                        okMaterial.opacity = Reactive.val(1);
                        happyMaterial.opacity = Reactive.val(1);
                        surprisePlaneMat.opacity = Reactive.val(0.2);
                        angryPlaneMat.opacity = Reactive.val(0.2);
                        okPlaneMat.opacity = Reactive.val(0.2);
                        happyPlaneMat.opacity = Reactive.val(0.2);
                    }

                    //updata every 0.1 sec
                    intervalTimer = Time.setInterval(function(){
                        timeNow = timeNow + 0.1;
                        currentTime = timeNow.toFixed(1);
                        //show beatPlane based on if has the cube
                        if(cubesL.length !== 0){
                            surprisePlaneMat.opacity = Reactive.val(1);
                        } else {
                            surprisePlaneMat.opacity = Reactive.val(0.2);
                        }
                        if(currentSelectedIndex >= 1) {
                            if(othasL.length !== 0){
                                angryPlaneMat.opacity = Reactive.val(1);
                            } else {
                                angryPlaneMat.opacity = Reactive.val(0.2);
                            }
                        }
                        if(currentSelectedIndex >= 2) {
                            if(icosasL.length !== 0){
                                okPlaneMat.opacity = Reactive.val(1);
                            } else {
                                okPlaneMat.opacity = Reactive.val(0.2);
                            }
                        }
                        if(currentSelectedIndex == 3) {
                            if(donutsL.length !== 0){
                                happyPlaneMat.opacity = Reactive.val(1);
                            } else {
                                happyPlaneMat.opacity = Reactive.val(0.2);
                            }
                        }

                        //check if Json at current time has beats
                        if(levelJson["level_" + (currentSelectedIndex + 1)][currentTime]){

                            //loop beats
                            levelJson["level_" + (currentSelectedIndex + 1)][currentTime].forEach(key => {

                                switch(key){
                                    case "s":                               
                                    //if has, dynamically instantiate cube block
                                    //LEFT side
                                    Blocks.instantiate("surpriseBlock", {"name":"surprise"}).then(function(block) {
                                        //store
                                        surpriseleft.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(90));
                                        //make it move rotate Y  
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerL) as ScalarSignal);
                                        timeDriver.start();
                                        cubesL.push(block);

                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            cubesL.shift();
                                        });
                                    });
                                    //RIGHT side
                                    Blocks.instantiate("surpriseBlock", {"name":"surprise"}).then(function(block) {
                                        //store
                                        surpriseright.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(-90));
                                        //make it move along 
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerR) as ScalarSignal);
                                        timeDriver.start();
                                        cubesR.push(block);
                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            cubesR.shift();
                                        });
                                    });

                                    break;

                                    case "a":                               
                                    //if has, dynamically instantiate cube block
                                    //LEFT side
                                    Blocks.instantiate("angryBlock", {"name":"angry"}).then(function(block) {
                                        //store
                                        angryleft.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(90));
                                        //make it move rotate Y  
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerL) as ScalarSignal);
                                        timeDriver.start();
                                        othasL.push(block);

                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            othasL.shift();
                                        });
                                    });
                                    //RIGHT side
                                    Blocks.instantiate("angryBlock", {"name":"angry"}).then(function(block) {
                                        //store
                                        angryright.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(-90));
                                        //make it move along 
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerR) as ScalarSignal);
                                        timeDriver.start();
                                        othasR.push(block);
                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            othasR.shift();
                                        });
                                    });

                                    break;

                                    case "o":                                                                 
                                    //if has, dynamically instantiate cube block
                                    //LEFT side
                                    Blocks.instantiate("okBlock", {"name":"ok"}).then(function(block) {
                                        //store
                                        okleft.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(90));
                                        //make it move rotate Y  
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerL) as ScalarSignal);
                                        timeDriver.start();
                                        icosasL.push(block);

                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            icosasL.shift();
                                        });
                                    });
                                    //RIGHT side
                                    Blocks.instantiate("okBlock", {"name":"ok"}).then(function(block) {
                                        //store
                                        okright.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(-90));
                                        //make it move along 
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerR) as ScalarSignal);
                                        timeDriver.start();
                                        icosasR.push(block);
                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            icosasR.shift();
                                        });
                                    });

                                    break;

                                    case "h":                               
                                    //if has, dynamically instantiate cube block
                                    //LEFT side
                                    Blocks.instantiate("happyBlock", {"name":"happy"}).then(function(block) {
                                        //store
                                        happyleft.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(90));
                                        //make it move rotate Y  
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerL) as ScalarSignal);
                                        timeDriver.start();
                                        donutsL.push(block);

                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            donutsL.shift();
                                        });
                                    });
                                    //RIGHT side
                                    Blocks.instantiate("happyBlock", {"name":"happy"}).then(function(block) {
                                        //store
                                        happyright.addChild(block);
                                        block.inputs.setScalar("DefaultY", Reactive.val(-90));
                                        //make it move along 
                                        const timeDriver = Animation.timeDriver(timeDriverParameters);
                                        block.inputs.setScalar("rotationY", Animation.animate(timeDriver, rotateSamplerR) as ScalarSignal);
                                        timeDriver.start();
                                        donutsR.push(block);
                                        //when complete remove from array, and scene
                                        timeDriver.onCompleted().subscribe(function(event){
                                            Scene.destroy(block);
                                            donutsR.shift();
                                        });
                                    });

                                    break;
                                }
                                
                            });
                        };

                        //====================================================================
                        //end the level if match the conditions

                        //check if currentTime bigger than duration in JSON
                        if((parseInt(currentTime) * 1000) > levelJson["level_" + (currentSelectedIndex + 1)].duration) {
                            //clear timer
                            Time.clearInterval(intervalTimer);
                            
                            //hide progressbar and picker
                            progressBar.hidden = Reactive.val(true);
                            progressBarDrivers.stop();
                            picker.visible = Reactive.val(true);

                            //check the collected score, >? min required
                            if(scoreTextValue >= levelJson["level_"+(currentSelectedIndex + 1)].minscoreText) {

                                //updata data
                                try{
                                    maxLevelUnlock = currentSelectedIndex + 1;
                                    data.level = maxLevelUnlock;
                                    userScope.set('data', data);
                                } catch( error ){
                                    Diagnostics.log('Failed to store,' + error);
                                };

                                //updata the picker UI
                                configuration.items[currentSelectedIndex + 1].image_texture = levelIcons[currentSelectedIndex + 1];
                                configuration.selectedIndex = currentSelectedIndex;
                                picker.configure(configuration);

                                //play unlock audio
                                unlockPlayback.reset();
                                unlockPlayback.setPlaying(true);
                                //unhide the confetti
                            }

                        }
                        
                    }, 100 );

                } else {
                    //====================================================================
                    //end if stop recording

                    //clear time and clean elements 
                    Time.clearInterval(intervalTimer);

                    scoreText.hidden = Reactive.val(true);

                    if (cubesL.length !== 0){
                        for( let i = 0; i < cubesL.length; i++){
                            Scene.destroy(cubesL[i]);
                            Scene.destroy(cubesR[i]);
                        }
                        cubesL.length == 0;
                        cubesR.length == 0;
                    }
                    if (othasL.length !== 0){
                        for( let i = 0; i < othasL.length; i++){
                            Scene.destroy(othasL[i]);
                            Scene.destroy(othasR[i]);
                        }
                        othasL.length == 0;
                        othasR.length == 0;
                    }
                    if (icosasL.length !== 0){
                        for( let i = 0; i < icosasL.length; i++){
                            Scene.destroy(icosasL[i]);
                            Scene.destroy(icosasR[i]);
                        }
                        icosasL.length == 0;
                        icosasR.length == 0;
                    }
                    if (donutsL.length !== 0){
                        for( let i = 0; i < donutsL.length; i++){
                            Scene.destroy(donutsL[i]);
                            Scene.destroy(donutsR[i]);
                        }
                        donutsL.length == 0;
                        donutsR.length == 0;
                    }

                    //hide progressbar and picker but show planes
                    progressBar.hidden = Reactive.val(true);
                    progressBarDrivers.stop();
                    picker.visible = Reactive.val(true);
                    surpriseblurDrivers.stop();

                    surprisePlaneMat.opacity = Reactive.val(1);
                    angryPlaneMat.opacity = Reactive.val(1);
                    okPlaneMat.opacity = Reactive.val(1);
                    happyPlaneMat.opacity = Reactive.val(1);

                    surpriseMaterial.opacity = Reactive.val(0);
                    angryMaterial.opacity = Reactive.val(0);
                    okMaterial.opacity = Reactive.val(0);
                    happyMaterial.opacity = Reactive.val(0);


                    if(scoreTextValue >= levelJson["level_"+(currentSelectedIndex + 1)].minscoreText) {
                        //updata the picker UI
                        picker.configure(configuration);

                        //play unlock audio
                        unlockPlayback.reset();
                        unlockPlayback.setPlaying(true);
                 
                    };
                    
                };
            }
        //}     
    });


    //==============================================================================
    //Detect expression and hits Check methods
    //==============================================================================

    //define feedback animation
    const blurTimeDriverParameters : {
        durationMilliseconds: number,
        loopCount: number,
        mirror: boolean
    } = {
        durationMilliseconds: 2000,
        loopCount: 2,
        mirror: true
    };
    
    const surpriseblurDrivers: TimeDriver = Animation.timeDriver(blurTimeDriverParameters);
    const angryblurDrivers: TimeDriver = Animation.timeDriver(blurTimeDriverParameters);
    const okblurDrivers: TimeDriver = Animation.timeDriver(blurTimeDriverParameters);
    const happyblurDrivers: TimeDriver = Animation.timeDriver(blurTimeDriverParameters);
    const blurSampler: ScalarSampler = Animation.samplers.easeInOutExpo(0,1);

    //surprise
    let isSurprise = surpriseHeadBack.weight.eq(Shoot);
    //if surprise detect
    isSurprise.monitor().subscribe(function(event) {
        //make sure user is not keeping the expression
        if(data.gameSpawned){
            if(event.newValue ){
                Patches.inputs.setScalar("faceType", faceType.surprise);
                surpriseBlur.opacity = Animation.animate(surpriseblurDrivers, blurSampler) as ScalarSignal;
                surpriseblurDrivers.start();

                //loop the cubes[] to see which one is on the key place
                for( let i = 0; i < cubesL.length; i++ ){
    
                    //check the cube's rotatetion right or not, in order.
                    const rotateY = cubesL[i].outputs.getScalarOrFallback("rotationY", Reactive.val(-1) ).pinLastValue();
        
                    // if(rotateY > 160){
                        
                    // }
                    //check the hit range 
                    if(rotateY > 170 && rotateY < 180){
                        //when hit, give assigned feedback

                        Patches.inputs.setBoolean("rippleStatus", true);
                        try { 
                            data.totalScore ++;
                            userScope.set('data', data);
                        } catch( error ){
                            Diagnostics.log('Failed to store,' + error);
                        };
        
                        Patches.inputs.setScalar("totalScore", data.totalScore);
    
                        //when hit, give score
                        scoreTextValue++;
    
                        if(scoreTextValue < 10){
                            (scoreText as TextExtrusion).text = Reactive.val("0" + scoreTextValue.toString());
                        } else {
                            (scoreText as TextExtrusion).text = Reactive.val("" + scoreTextValue.toString());
                        }
                        break;
                    }
                }
                
            } else {
                //when not hit, disable the assigned feedback
                Patches.inputs.setBoolean("rippleStatus", false);
                surpriseblurDrivers.stop();
                surpriseblurDrivers.reset();
            }
        }
        
    });

     //angry
     let isAngry = angryhead.weight.eq(Shoot);
     //if surprise detect
     isAngry.monitor().subscribe(function(event) {
         //make sure user is not keeping the expression
         if(data.gameSpawned){
             if(event.newValue ){
                 Patches.inputs.setScalar("faceType", faceType.angry);
                 angryBlur.opacity = Animation.animate(angryblurDrivers, blurSampler) as ScalarSignal;
                 angryblurDrivers.start();

                 //loop the cubes[] to see which one is on the key place
                 for( let i = 0; i < othasL.length; i++ ){
     
                     //check the cube's rotatetion right or not, in order.
                     const rotateY = othasL[i].outputs.getScalarOrFallback("rotationY", Reactive.val(-1) ).pinLastValue();
         
                    //  if(rotateY > 160){

                     
                    //  }
                     //check the hit range 
                     if(rotateY > 170 && rotateY < 180){
                         //when hit, give assigned feedback
                         Patches.inputs.setBoolean("rippleStatus", true);
     
                         try { 
                            data.totalScore ++;
                            userScope.set('data', data);
                        } catch( error ){
                            Diagnostics.log('Failed to store,' + error);
                        };
        
                        Patches.inputs.setScalar("totalScore", data.totalScore);
     
                         //when hit, give score
                         scoreTextValue++;
     
                         if(scoreTextValue < 10){
                             (scoreText as TextExtrusion).text = Reactive.val("0" + scoreTextValue.toString());
                         } else {
                             (scoreText as TextExtrusion).text = Reactive.val("" + scoreTextValue.toString());
                         }
                         break;
                     }
                 }
                 
             } else {
                 //when not hit, disable the assigned feedback
                 Patches.inputs.setBoolean("rippleStatus", false);
                 angryblurDrivers.stop();
                 angryblurDrivers.reset();
             }
         }
         
     });

    //ok
     let isOk = okcheekLeft.weight.eq(Shoot);
     //if surprise detect
     isOk.monitor().subscribe(function(event) {
         //make sure user is not keeping the expression
         if(data.gameSpawned){
             if(event.newValue ){
                 Patches.inputs.setScalar("faceType", faceType.ok);
                 okBlur.opacity = Animation.animate(okblurDrivers, blurSampler) as ScalarSignal;
                 okblurDrivers.start();
                 
                 //loop the cubes[] to see which one is on the key place
                 for( let i = 0; i < icosasL.length; i++ ){
     
                     //check the cube's rotatetion right or not, in order.
                     const rotateY = icosasL[i].outputs.getScalarOrFallback("rotationY", Reactive.val(-1) ).pinLastValue();
         
                    //  if(rotateY > 160){

                    //  }
                     //check the hit range 
                     if(rotateY > 170 && rotateY < 180){
                         //when hit, give assigned feedback

                         Patches.inputs.setBoolean("rippleStatus", true);

                         try { 
                            data.totalScore ++;
                            userScope.set('data', data);
                        } catch( error ){
                            Diagnostics.log('Failed to store,' + error);
                        };
        
                        Patches.inputs.setScalar("totalScore", data.totalScore);
     
                         //when hit, give score
                         scoreTextValue++;
     
                         if(scoreTextValue < 10){
                             (scoreText as TextExtrusion).text = Reactive.val("0" + scoreTextValue.toString());
                         } else {
                             (scoreText as TextExtrusion).text = Reactive.val("" + scoreTextValue.toString());
                         }
                         break;
                     }
                 }
                 
             } else {
                 //when not hit, disable the assigned feedback
                 Patches.inputs.setBoolean("rippleStatus", false);
                 okblurDrivers.stop();
                 okblurDrivers.reset();
             }
         }
         
     });

     //happy
     let isHappy = happyControl.eq(Shoot);
     //if surprise detect
     isHappy.monitor().subscribe(function(event) {
         //make sure user is not keeping the expression
         if(data.gameSpawned){
             if(event.newValue ){
                 Patches.inputs.setScalar("faceType", faceType.happy);
                 happyBlur.opacity = Animation.animate(happyblurDrivers, blurSampler) as ScalarSignal;
                 happyblurDrivers.start();
                 //loop the cubes[] to see which one is on the key place
                 for( let i = 0; i < donutsL.length; i++ ){
     
                     //check the cube's rotatetion right or not, in order.
                     const rotateY = donutsL[i].outputs.getScalarOrFallback("rotationY", Reactive.val(-1) ).pinLastValue();
                    // if(rotateY > 160){

                    // }

                     //check the hit range 
                     if(rotateY > 170 && rotateY < 180){
                         //when hit, give assigned feedback
                        
                         Patches.inputs.setBoolean("rippleStatus", true);

                         try { 
                            data.totalScore ++;
                            userScope.set('data', data);
                        } catch( error ){
                            Diagnostics.log('Failed to store,' + error);
                        };
        
                        Patches.inputs.setScalar("totalScore", data.totalScore);
     
                         //when hit, give score
                         scoreTextValue++;
     
                         if(scoreTextValue < 10){
                             (scoreText as TextExtrusion).text = Reactive.val("0" + scoreTextValue.toString());
                         } else {
                             (scoreText as TextExtrusion).text = Reactive.val("" + scoreTextValue.toString());
                         }
                         break;
                     }
                 }
                 
             } else {
                 //when not hit, disable the assigned feedback
                 Patches.inputs.setBoolean("rippleStatus", false);
                 happyblurDrivers.stop();
                 happyblurDrivers.reset();
             }
         }
         
     });


    //==============================================================================
    //Check user is using which side of camera to instantiate 

    CameraInfo.captureDevicePosition.monitor({ fireOnInitialValue: true }).subscribe( (event) => {
        (event.newValue == "FRONT") ? frontCamera = true : frontCamera = false;

        //remove platformItems form its parent
        instantiated?cameraPlatformItems.removeFromParent():"";

        //add platformItems to both based on the value;
        frontCamera? frontCameraPlatform.addChild(cameraPlatformItems) : backCameraplatform.addChild(cameraPlatformItems);

        if(!instantiated) {

            instantiated = true;

            //==============================================================================
            //Ddefine hit feedbacks

            const KeyPx: ScalarSignal = Reactive.val(0);

            const sKeyPy: ScalarSignal = Reactive.val(0.098);
            const aKeyPy: ScalarSignal = Reactive.val(0.057);
            const oKeyPy: ScalarSignal = Reactive.val(0.026);
            const hKeyPy: ScalarSignal = Reactive.val(-0.0205);

            const sKeyPz: ScalarSignal = Reactive.val(0.085);
            const sblur1z: ScalarSignal = Reactive.val(0.002).add(sKeyPz);
            const sblur2z: ScalarSignal = Reactive.val(0.004).add(sKeyPz);
            const sblur3z: ScalarSignal = Reactive.val(0.006).add(sKeyPz);
            const sblur4z: ScalarSignal = Reactive.val(0.01).add(sKeyPz);

            const aKeyPz: ScalarSignal = Reactive.val(0.092);
            const ablur1z: ScalarSignal = Reactive.val(0.002).add(aKeyPz);
            const ablur2z: ScalarSignal = Reactive.val(0.004).add(aKeyPz);
            const ablur3z: ScalarSignal = Reactive.val(0.006).add(aKeyPz);
            const ablur4z: ScalarSignal = Reactive.val(0.01).add(aKeyPz);

            const oKeyPz: ScalarSignal = Reactive.val(0.099);
            const oblur1z: ScalarSignal = Reactive.val(0.002).add(oKeyPz);
            const oblur2z: ScalarSignal = Reactive.val(0.004).add(oKeyPz);
            const oblur3z: ScalarSignal = Reactive.val(0.006).add(oKeyPz);
            const oblur4z: ScalarSignal = Reactive.val(0.01).add(oKeyPz);

            const hKeyPz: ScalarSignal = Reactive.val(0.081);
            const hblur1z: ScalarSignal = Reactive.val(0.002).add(hKeyPz);
            const hblur2z: ScalarSignal = Reactive.val(0.004).add(hKeyPz);
            const hblur3z: ScalarSignal = Reactive.val(0.006).add(hKeyPz);
            const hblur4z: ScalarSignal = Reactive.val(0.01).add(hKeyPz);
           
            surpriseKey.transform.position = Reactive.scale(KeyPx, sKeyPy, sKeyPz);
            surpriseBlur1.transform.position = Reactive.scale(KeyPx, sKeyPy, sblur1z);
            surpriseBlur2.transform.position = Reactive.scale(KeyPx, sKeyPy, sblur2z);
            surpriseBlur3.transform.position = Reactive.scale(KeyPx, sKeyPy, sblur3z);
            surpriseBlur4.transform.position = Reactive.scale(KeyPx, sKeyPy, sblur4z);

            angryKey.transform.position = Reactive.scale(KeyPx, aKeyPy, aKeyPz);
            angryBlur1.transform.position = Reactive.scale(KeyPx, aKeyPy, ablur1z);
            angryBlur2.transform.position = Reactive.scale(KeyPx, aKeyPy, ablur2z);
            angryBlur3.transform.position = Reactive.scale(KeyPx, aKeyPy, ablur3z);
            angryBlur4.transform.position = Reactive.scale(KeyPx, aKeyPy, ablur4z);

            okKey.transform.position = Reactive.scale(KeyPx, oKeyPy, oKeyPz);
            okBlur1.transform.position = Reactive.scale(KeyPx, oKeyPy, oblur1z);
            okBlur2.transform.position = Reactive.scale(KeyPx, oKeyPy, oblur2z);
            okBlur3.transform.position = Reactive.scale(KeyPx, oKeyPy, oblur3z);
            okBlur4.transform.position = Reactive.scale(KeyPx, oKeyPy, oblur4z);

            happyKey.transform.position = Reactive.scale(KeyPx, hKeyPy, hKeyPz);
            happyBlur1.transform.position = Reactive.scale(KeyPx, hKeyPy, hblur1z);
            happyBlur2.transform.position = Reactive.scale(KeyPx, hKeyPy, hblur2z);
            happyBlur3.transform.position = Reactive.scale(KeyPx, hKeyPy, hblur3z);
            happyBlur4.transform.position = Reactive.scale(KeyPx, hKeyPy, hblur4z);



            const keyScale: ScalarSignal = Reactive.val(0.1);
            const blurScaleOut: ScalarSignal = Reactive.val(0.25);

            surpriseKey.transform.scale = Reactive.scale(keyScale, keyScale, keyScale);
            surpriseBlur1.transform.scale = Reactive.scale(keyScale.add(0.025), keyScale.add(0.025), keyScale.add(0.025));
            surpriseBlur2.transform.scale = Reactive.scale(keyScale.add(0.05), keyScale.add(0.05), keyScale.add(0.05));
            surpriseBlur3.transform.scale = Reactive.scale(keyScale.add(0.1), keyScale.add(0.1), keyScale.add(0.1));
            surpriseBlur4.transform.scale = Reactive.scale(blurScaleOut, blurScaleOut, blurScaleOut);

            angryKey.transform.scale = Reactive.scale(keyScale, keyScale, keyScale);
            angryBlur1.transform.scale = Reactive.scale(keyScale.add(0.025), keyScale.add(0.025), keyScale.add(0.025));
            angryBlur2.transform.scale = Reactive.scale(keyScale.add(0.05), keyScale.add(0.05), keyScale.add(0.05));
            angryBlur3.transform.scale = Reactive.scale(keyScale.add(0.1), keyScale.add(0.1), keyScale.add(0.1));
            angryBlur4.transform.scale = Reactive.scale(blurScaleOut, blurScaleOut, blurScaleOut);

            okKey.transform.scale = Reactive.scale(keyScale, keyScale, keyScale);
            okBlur1.transform.scale = Reactive.scale(keyScale.add(0.025), keyScale.add(0.025), keyScale.add(0.025));
            okBlur2.transform.scale = Reactive.scale(keyScale.add(0.05), keyScale.add(0.05), keyScale.add(0.05));
            okBlur3.transform.scale = Reactive.scale(keyScale.add(0.1), keyScale.add(0.1), keyScale.add(0.1));
            okBlur4.transform.scale = Reactive.scale(blurScaleOut, blurScaleOut, blurScaleOut);

            happyKey.transform.scale = Reactive.scale(keyScale, keyScale, keyScale);
            happyBlur1.transform.scale = Reactive.scale(keyScale.add(0.025), keyScale.add(0.025), keyScale.add(0.025));
            happyBlur2.transform.scale = Reactive.scale(keyScale.add(0.05), keyScale.add(0.05), keyScale.add(0.05));
            happyBlur3.transform.scale = Reactive.scale(keyScale.add(0.1), keyScale.add(0.1), keyScale.add(0.1));
            happyBlur4.transform.scale = Reactive.scale(blurScaleOut, blurScaleOut, blurScaleOut);

            //set materials for keys
            (surpriseKey as Plane).material = surpriseMaterial;
            (surpriseBlur1 as Plane).material = surpriseBlur;
            (surpriseBlur2 as Plane).material = surpriseBlur;
            (surpriseBlur3 as Plane).material = surpriseBlur;
            (surpriseBlur4 as Plane).material = surpriseBlur;

            (angryKey as Plane).material = angryMaterial;
            (angryBlur1 as Plane).material = angryBlur;
            (angryBlur2 as Plane).material = angryBlur;
            (angryBlur3 as Plane).material = angryBlur;
            (angryBlur4 as Plane).material = angryBlur;

            (okKey as Plane).material = okMaterial;
            (okBlur1 as Plane).material = okBlur;
            (okBlur2 as Plane).material = okBlur;
            (okBlur3 as Plane).material = okBlur;
            (okBlur4 as Plane).material = okBlur;

            (happyKey as Plane).material = happyMaterial;
            (happyBlur1 as Plane).material = happyBlur;
            (happyBlur2 as Plane).material = happyBlur;
            (happyBlur3 as Plane).material = happyBlur;
            (happyBlur4 as Plane).material = happyBlur;

            //add all items to cameraPlatformItems
           
            cameraPlatformItems.addChild(surpriseKey);
            cameraPlatformItems.addChild(surpriseBlur1);
            cameraPlatformItems.addChild(surpriseBlur2);
            cameraPlatformItems.addChild(surpriseBlur3);
            cameraPlatformItems.addChild(surpriseBlur4);

            cameraPlatformItems.addChild(angryKey);
            cameraPlatformItems.addChild(angryBlur1);
            cameraPlatformItems.addChild(angryBlur2);
            cameraPlatformItems.addChild(angryBlur3);
            cameraPlatformItems.addChild(angryBlur4);

            cameraPlatformItems.addChild(okKey);
            cameraPlatformItems.addChild(okBlur1);
            cameraPlatformItems.addChild(okBlur2);
            cameraPlatformItems.addChild(okBlur3);
            cameraPlatformItems.addChild(okBlur4);

            cameraPlatformItems.addChild(happyKey);
            cameraPlatformItems.addChild(happyBlur1);
            cameraPlatformItems.addChild(happyBlur2);
            cameraPlatformItems.addChild(happyBlur3);
            cameraPlatformItems.addChild(happyBlur4);

            // hide everything before initialized
            surpriseBlur.opacity = Reactive.val(0);
            angryBlur.opacity = Reactive.val(0);
            okBlur.opacity = Reactive.val(0);
            happyBlur.opacity = Reactive.val(0);

            surpriseMaterial.opacity = Reactive.val(0);
            angryMaterial.opacity = Reactive.val(0);
            okMaterial.opacity = Reactive.val(0);
            happyMaterial.opacity = Reactive.val(0);

            surprisePlaneMat.opacity = Reactive.val(0);
            angryPlaneMat.opacity = Reactive.val(0);
            okPlaneMat.opacity = Reactive.val(0);
            happyPlaneMat.opacity = Reactive.val(0);     
        }

    });


})(); // Enables async/await in JS [part 2]
