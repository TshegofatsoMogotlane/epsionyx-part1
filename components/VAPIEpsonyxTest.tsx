'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Mic, MicOff, Phone, PhoneOff, GraduationCap } from 'lucide-react'
import { useVAPI } from '@/hooks/useVAPI'

const VAPIEpsonyxTest = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<'interviewCoach' | 'studyBuddy' | 'careerCoach'>('interviewCoach')

  // Sample interview questions for testing
  const sampleQuestions = [
    "Tell me about a challenging project you worked on during your studies and how you overcame obstacles.",
    "How would you apply the theoretical concepts you've learned to solve real-world problems in this industry?",
    "Describe a time when you had to learn a new technology or concept quickly. How did you approach it?",
    "What academic project are you most proud of and why?",
    "How do you stay updated with industry trends related to your field of study?"
  ]

  const {
    isConnected,
    isLoading,
    isSpeaking,
    error,
    formattedDuration,
    startCall,
    endCall,
    clearError
  } = useVAPI({
    assistantType: selectedAssistant,
    topic: 'Software Engineering',
    interviewQuestions: sampleQuestions,
    context: 'Computer Science student preparing for software engineering interviews',
    onCallStart: () => {
      console.log('✅ Epsionyx assistant call started')
    },
    onCallEnd: () => {
      console.log('✅ Epsionyx assistant call ended')
    },
    onError: (err) => {
      console.error('❌ Epsionyx assistant error:', err)
    }
  })

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <GraduationCap className="h-5 w-5" />
          Epsionyx AI Assistant Test
        </CardTitle>
        <p className="text-sm text-blue-600">
          Testing educational AI assistants with correct Epsionyx prompts
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        {/* Assistant Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Choose Assistant Type:</label>
          <div className="flex gap-2 flex-wrap">
            {(['interviewCoach', 'studyBuddy', 'careerCoach'] as const).map((type) => (
              <Button
                key={type}
                variant={selectedAssistant === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedAssistant(type)}
                disabled={isConnected}
              >
                {type === 'interviewCoach' && '🎤 Interview'}
                {type === 'studyBuddy' && '📚 Study'}
                {type === 'careerCoach' && '💼 Career'}
              </Button>
            ))}
      xTestPIEpsonyult VAport defa

ex)
}>
  ard
    </Content></CardC    v>
          </dis</div>
ed logil detaforser console eck browv>📝 Ch       <di>
   ess</divone acc microph to allowke surev>🎤 Ma      <di   </div>
 promptsucational yx edt Epsionhe correc will test tdiv>🎯 This     <">
     0 space-y-1gray-50xt-xs text-"te className=<div}
        tructions */  {/* Ins

       </div>}
                 ) </Button>

           d Session        En>
      -2" /mre="h-4 w-4 Nam classhoneOff       <P        >
    "
       w-fullclassName="             
 tructive""desnt=  varia    l}
        dCalk={ennClic           on
       <Butto    (
            ) : >
  </Button                  )}
     </>
             }
      er Coaching'' : 'Careonssitudy Se? 'Sdy' yBudstud== 'sistant =As' : selected? 'InterviewrviewCoach'  === 'intetantelectedAssis{sonyx Epsit Star             " />
     4 w-4 mr-2h-e="ssNamone claPh      <               <>
             ) : (
         
              </>    ing...
   onnect      C  
          r-2"></div> marent-transpr-t bordeteer-whi-2 bord-4 border h-4 wounded-fulln rate-spiName="animssiv cla         <d
                 <>(
        ading ?     {isLo        
        >
      rple-700"er:to-pulue-700 hov-bover:fromle-600 hrpe-600 to-pum-blur frot-to--gradienfull bg="w-   className          sLoading}
 d={iable         disll}
     ick={startCa onCl        
          <Button
        (ed ?Connect     {!is-2">
     -yspaceme=" classNa<div}
         Buttons */ntrol  {/* Co   

    )}   >
    div  </
        iv>     </d
       stions...1} more ques.length - Question{sample  +            0 mt-1">
text-blue-50-xs xte="tev classNam  <di       /div>
       <"
        tions[0]}Ques   "{sample      00">
     text-blue-6text-xs "sName=<div clas         
   div></        Ready:
     Questions       Sample  
      -2">blue-800 mbdium text-ont-mext-sm fe="teamdiv classN   <        ">
 gd-lue-50 roundeblbg-="p-3 meclassNa       <div d && (
   necteCon&& !isrviewCoach'  === 'inteedAssistantect {sel       review */}
ns Pe Questio   {/* Sampl  

   }       )v>
    </di      div>
   </         Button>
 }>×</clearErrorck={" onCli size="sm"ghost"iant=tton var<Bu             /div>
            <>
   r}</divroerred-600">{ext-m t="text-sameclassN    <div   
          r:</div>00">Errom text-red-8ont-mediu="text-sm fName class      <div     >
     <div           art">
   ems-stiten etweify-b justlex"f=v className     <di   ">
    -lg200 roundedd-border-re border  bg-red-50sName="p-3div clas        < && (
     {error}
     splay */Di {/* Error 

       >div     </ )}
            
      </div>    iv>
        </d   div>
           </       
   'Listening'}aking' : Spepeaking ? '     {isS      '}>
       xt-blue-6000' : 'tegreen-60ing ? 'text-isSpeak className={   <div           :</span>
  ">AI Status-gray-600"textassName=span cl          <    <div>
             /div>
      <    >
       </divuration}ormattedDno">{fme="font-moiv classNa   <d             n>
spa</Duration:0">ay-60"text-gre=classNampan           <siv>
              <d      -sm">
p-4 textgad-cols-2 "grid grie= classNam   <div       ted && (
  isConnec  {         
        iv>
         </d/Badge>
        <y'}
      : 'Readonnected' ted ? 'C   {isConnec       ary'}>
    : 'secondault'  ? 'defted{isConnecnt=<Badge varia           </span>
 um">Status: font-medi"text-smme=an classNa    <sp    -2">
    er mbn items-centtify-betweee="flex jusam<div classN          ded-lg">
0 rouny-5p-3 bg-graName="ss   <div cla
     lay */}tatus Disp* S{/
        div>
 </v>
        </di   