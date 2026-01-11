import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Mesh, Group } from 'three';
import { useWebGLAvailable } from '@/hooks/use-webgl';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Code Bracket Component - Creates { } < > [ ] symbols
const CodeBracket = ({
  position,
  bracket,
  color,
  scrollY,
  scrollFactor,
  rotationSpeed
}: {
  position: [number, number, number];
  bracket: string;
  color: string;
  scrollY: number;
  scrollFactor: number;
  rotationSpeed: number;
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scrollY * scrollFactor * 0.0001;
      groupRef.current.position.y = position[1] + scrollOffset;
      groupRef.current.rotation.y += rotationSpeed * 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create bracket shapes using box geometries
  const createBracket = () => {
    switch (bracket) {
      case '{':
        return (
          <group>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[-0.1, 0.25, 0]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[-0.1, -0.25, 0]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      case '}':
        return (
          <group>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0.1, 0.25, 0]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0.1, -0.25, 0]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      case '<':
        return (
          <group>
            <mesh position={[0.15, 0.3, 0]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0.15, -0.3, 0]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      case '>':
        return (
          <group>
            <mesh position={[-0.15, 0.3, 0]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[-0.15, -0.3, 0]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      case '[':
        return (
          <group>
            <mesh position={[0.1, 0, 0]}>
              <boxGeometry args={[0.1, 1.2, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      case ']':
        return (
          <group>
            <mesh position={[-0.1, 0, 0]}>
              <boxGeometry args={[0.1, 1.2, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={1.5}>
        {createBracket()}
      </group>
    </Float>
  );
};

// Database Stack Component - Represents Supabase/PostgreSQL
const DatabaseStack = ({
  position,
  scrollY,
  scrollFactor
}: {
  position: [number, number, number];
  scrollY: number;
  scrollFactor: number;
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scrollY * scrollFactor * 0.0001;
      groupRef.current.position.y = position[1] + scrollOffset;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;

      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={0.2} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} position={position}>
        {/* Database cylinders stacked */}
        {[0, 0.6, 1.2].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.5, 16]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.2 + i * 0.1}
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
        {/* Connection lines */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Neural Network Node with connections
const NeuralNode = ({
  position,
  scrollY}: {
  position: [number, number, number];
  scrollY: number;
  connections?: [number, number, number][];
}) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing glow effect
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
      (meshRef.current.material as any).emissiveIntensity = intensity;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] - scrollY * 0.00005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#aa00ff"
            emissive="#aa00ff"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Flutter Diamond Shape
const FlutterDiamond = ({
  position,
  scrollY,
  scrollFactor
}: {
  position: [number, number, number];
  scrollY: number;
  scrollFactor: number;
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const scrollOffset = scrollY * scrollFactor * 0.0001;
      meshRef.current.position.y = position[1] + scrollOffset;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.PI / 4; // Diamond orientation
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.2, 1.2, 0.3]} />
        <meshStandardMaterial
          color="#02569B"
          emissive="#00bcd4"
          emissiveIntensity={0.25}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Binary Digit Particle
const BinaryParticle = ({
  position,
  digit,
  speed
}: {
  position: [number, number, number];
  digit: '0' | '1';
  speed: number;
}) => {
  const meshRef = useRef<Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      // Slow upward drift
      meshRef.current.position.y = initialY + ((state.clock.elapsedTime * speed) % 15);

      // Fade based on position
      const opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      (meshRef.current.material as any).opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {digit === '0' ? (
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
      ) : (
        <boxGeometry args={[0.08, 0.4, 0.08]} />
      )}
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.2}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
};

// Git Branch Line
const GitBranch = ({
  position,
  scrollY
}: {
  position: [number, number, number];
  scrollY: number;
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle glow pulse
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      groupRef.current.children.forEach(child => {
        if ((child as Mesh).material) {
          ((child as Mesh).material as any).emissiveIntensity = pulse;
        }
      });
      groupRef.current.position.y = position[1] - scrollY * 0.00003;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main branch */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Branch splits */}
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh position={[-0.5, -0.4, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.2}
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Commit nodes */}
      {[[-1.5, 0, 0], [-0.5, 0, 0], [0.5, 0, 0], [1.5, 0, 0], [1.3, 0.8, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Terminal/Console Window
const TerminalWindow = ({
  position,
  scrollY,
  scrollFactor
}: {
  position: [number, number, number];
  scrollY: number;
  scrollFactor: number;
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scrollY * scrollFactor * 0.0001;
      groupRef.current.position.y = position[1] + scrollOffset;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={0.25} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef} position={position}>
        {/* Window frame */}
        <mesh>
          <boxGeometry args={[2.5, 1.8, 0.1]} />
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#00ffff"
            emissiveIntensity={0.1}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Title bar */}
        <mesh position={[0, 0.75, 0.06]}>
          <boxGeometry args={[2.4, 0.2, 0.02]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Code lines */}
        {[-0.4, -0.1, 0.2, 0.5].map((y, i) => (
          <mesh key={i} position={[-0.3 + i * 0.1, y, 0.06]}>
            <boxGeometry args={[1.5 - i * 0.2, 0.08, 0.02]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.15}
              transparent
              opacity={0.25}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const Scene = ({ scrollY }: { scrollY: number }) => {
  const groupRef = useRef<Group>(null);

  // Generate binary particles
  const binaryParticles = useMemo(() => {
    return Array.from({ length: 25 }, (_) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5,
        -8 - Math.random() * 5
      ] as [number, number, number],
      digit: Math.random() > 0.5 ? '1' : '0' as '0' | '1',
      speed: 0.1 + Math.random() * 0.2
    }));
  }, []);

  // Neural network node positions
  const neuralNodes = useMemo(() => [
    [4, 2, -4],
    [5, 1, -5],
    [4.5, 0, -4.5],
    [5.5, -1, -5],
    [4, -2, -4],
    [6, 0, -6],
  ] as [number, number, number][], []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = scrollY * 0.00001;
      groupRef.current.position.y = -scrollY * 0.0002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Code Brackets */}
      <CodeBracket position={[-7, 3, -3]} bracket="{" color="#00ffff" scrollY={scrollY} scrollFactor={-2} rotationSpeed={1} />
      <CodeBracket position={[-5, 3.5, -4]} bracket="}" color="#00ffff" scrollY={scrollY} scrollFactor={-1.5} rotationSpeed={0.8} />

      <CodeBracket position={[7, -2, -3]} bracket="<" color="#ff00ff" scrollY={scrollY} scrollFactor={2} rotationSpeed={1.2} />
      <CodeBracket position={[8.5, -1.5, -4]} bracket=">" color="#ff00ff" scrollY={scrollY} scrollFactor={1.8} rotationSpeed={1} />

      <CodeBracket position={[-6, -4, -4]} bracket="[" color="#aa00ff" scrollY={scrollY} scrollFactor={-1.8} rotationSpeed={0.9} />
      <CodeBracket position={[-4.5, -3.5, -5]} bracket="]" color="#aa00ff" scrollY={scrollY} scrollFactor={-2.2} rotationSpeed={1.1} />

      <CodeBracket position={[3, 5, -5]} bracket="{" color="#00ff88" scrollY={scrollY} scrollFactor={3} rotationSpeed={0.7} />
      <CodeBracket position={[5, 4.5, -4]} bracket="}" color="#00ff88" scrollY={scrollY} scrollFactor={2.5} rotationSpeed={0.9} />

      {/* Database Stacks */}
      <DatabaseStack position={[-9, -1, -5]} scrollY={scrollY} scrollFactor={1.5} />
      <DatabaseStack position={[9, 3, -6]} scrollY={scrollY} scrollFactor={-2} />

      {/* Neural Network Nodes */}
      {neuralNodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} scrollY={scrollY} />
      ))}

      {/* Flutter Diamonds */}
      <FlutterDiamond position={[-8, 5, -5]} scrollY={scrollY} scrollFactor={-2.5} />
      <FlutterDiamond position={[6, -5, -4]} scrollY={scrollY} scrollFactor={2} />

      {/* Git Branch */}
      <GitBranch position={[0, -6, -5]} scrollY={scrollY} />

      {/* Terminal Windows */}
      <TerminalWindow position={[-4, 0, -6]} scrollY={scrollY} scrollFactor={1} />
      <TerminalWindow position={[2, 4, -7]} scrollY={scrollY} scrollFactor={-1.5} />

      {/* Binary Particles */}
      {binaryParticles.map((particle, i) => (
        <BinaryParticle
          key={i}
          position={particle.position}
          digit={particle.digit}
          speed={particle.speed}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.12} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
      <pointLight position={[0, 5, 5]} intensity={0.25} color="#aa00ff" />
      <pointLight position={[0, -5, 5]} intensity={0.15} color="#00ff88" />
      <pointLight position={[-5, 0, 5]} intensity={0.2} color="#02569B" />
    </group>
  );
};

const ScrollReactive3DBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const webgl = useWebGLAvailable();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!webgl) {
    return <div className="fixed inset-0 bg-background -z-10" />;
  }

  return (
    <div className="fixed inset-0 z-0" style={{ backgroundColor: 'hsl(240 15% 10%)' }}>
      {/* Static glow orbs that move with scroll */}
      <div
        className="absolute w-96 h-96 bg-primary/15 rounded-full blur-[120px] transition-transform duration-500"
        style={{
          top: `calc(25% - ${scrollY * 0.1}px)`,
          left: '25%',
        }}
      />
      <div
        className="absolute w-80 h-80 bg-secondary/15 rounded-full blur-[100px] transition-transform duration-500"
        style={{
          bottom: `calc(25% + ${scrollY * 0.05}px)`,
          right: '25%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] left-1/2 -translate-x-1/2 transition-transform duration-500"
        style={{
          top: `calc(50% - ${scrollY * 0.08}px)`,
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <ErrorBoundary fallback={<div className="absolute inset-0" />}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene scrollY={scrollY} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
    </div>
  );
};

export default ScrollReactive3DBackground;
