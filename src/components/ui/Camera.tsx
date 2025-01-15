import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type CameraProps = {
  width: number;
  aspect: number;
};

const Camera = forwardRef<HTMLVideoElement, CameraProps>((props, ref) => {
  const { width, aspect } = props;
  const height = width / aspect;
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element

  // Expose videoRef to the parent component
  useImperativeHandle(ref, () => videoRef.current!);

  useEffect(() => {
    const setupVideoInput = async () => {
      try {
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width, height }, // Constraints for the video
          });

          // Assign the media stream to the video element
          videoRef.current.srcObject = stream;

          // Play the video
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    setupVideoInput();

    return () => {
      // Cleanup: Stop all video tracks when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [width, height]);

  return <video ref={videoRef} width={width} height={height} />;
});

export default Camera;
