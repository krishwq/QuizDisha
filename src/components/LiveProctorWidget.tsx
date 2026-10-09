import React, { useEffect, useRef, useState } from 'react';
import { Video, Mic, ShieldAlert, Minimize2, Maximize2 } from 'lucide-react';

interface LiveProctorWidgetProps {
  stream: MediaStream | null;
  isRecording: boolean;
  strikeCount: number;
}

export const LiveProctorWidget: React.FC<LiveProctorWidgetProps> = ({
  stream,
  isRecording,
  strikeCount,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Audio level meter
  useEffect(() => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return;

    let animId: number;
    let audioCtx: AudioContext | null = null;
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      const buffer = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) sum += buffer[i];
        const avg = sum / buffer.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animId = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) {
      console.warn('Proctor widget audio meter error:', e);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, [stream]);

  return (
    <div 
      id="live-proctor-pip-widget"
      className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#d6e4f0] rounded-2xl shadow-xl overflow-hidden transition-all duration-200 select-none"
      style={{ width: isMinimized ? '190px' : '230px' }}
    >
      {/* Widget Header */}
      <div className="bg-[#f8fbfe] px-3.5 py-2.5 border-b border-[#d6e4f0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#00072d]">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-rec-pulse"></span>
          <span>Proctor Cam</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-[#536b82] hover:text-[#00072d] p-1 rounded-lg hover:bg-[#edf5fa] transition-colors cursor-pointer"
            title={isMinimized ? 'Expand Camera View' : 'Minimize Camera View'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      {!isMinimized && (
        <div className="relative aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            <div className="text-xs text-[#536b82] p-2 text-center">
              A/V stream initializing...
            </div>
          )}

          {/* Overlay Status Indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-mono text-[#a6e1fa] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse"></span>
            <span>AUDIT LIVE</span>
          </div>

          {/* Audio Visualizer Pill */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-2 border border-white/10">
            <Mic className="w-3 h-3 text-[#a6e1fa] shrink-0" />
            <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#16a34a] via-[#0e6ba8] to-[#0a2472] transition-all duration-75"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="p-2.5 bg-[#f8fbfe] flex items-center justify-between text-[11px] border-t border-[#d6e4f0]">
        <span className="flex items-center gap-1 text-[#536b82]">
          <Video className="w-3 h-3 text-[#0e6ba8]" /> Sensor On
        </span>

        <span 
          className={`font-semibold flex items-center gap-1 ${
            strikeCount > 0 ? 'text-[#E11D48]' : 'text-[#16a34a]'
          }`}
        >
          <ShieldAlert className="w-3 h-3" />
          {strikeCount} / 3 Strikes
        </span>
      </div>
    </div>
  );
};
