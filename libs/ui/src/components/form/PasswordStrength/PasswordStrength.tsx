import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, keyframes, styled, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import SuccessIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';

import type { FC} from 'react';
import React, { useMemo } from 'react';

import { useDensitySpacing } from '../../../utils/density';
import type { PasswordRequirements, PasswordStrengthProps } from './PasswordStrength.types';

interface RequirementIconProps {
  met: boolean;
}
const RequirementIcon: FC<RequirementIconProps> = ({ met }) => {
  return met ? (
    <CheckIcon data-testid="check-icon" />
  ) : (
    <CloseIcon data-testid="close-icon" />
  );
};

// Default requirements
const defaultRequirements: PasswordRequirements = {
  minLength: 8,
  uppercase: true,
  lowercase: true,
  numbers: true,
  special: true,
};

// Animation keyframes
const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled components
const StrengthContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'animated',
})<{ animated?: boolean }>(({ theme, animated }) => ({
  width: '100%',
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: animated ? 'all 0.3s ease' : 'none',
}));

const StrengthBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'strength' && prop !== 'animated',
})<{ strength: number; animated?: boolean }>(({ theme, strength, animated }) => {
  const getColor = () => {
    if (strength <= 20) return theme.palette.error.main;
    if (strength <= 40) return theme.palette.warning.main;
    if (strength <= 60) return theme.palette.info.main;
    if (strength <= 80) return theme.palette.success.light;
    return theme.palette.success.main;
  };

  const getGradient = () => {
    const color = getColor();
    return `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`;
  };

  return {
    height: 8,
    borderRadius: 4,
    backgroundColor: alpha(theme.palette.action.disabled, 0.1),
    '& .MuiLinearProgress-bar': {
      borderRadius: 4,
      background: getGradient(),
      transition: animated ? 'all 0.3s ease' : 'none',
      boxShadow: `0 2px 8px ${alpha(getColor(), 0.3)}`,
    },
  };
});

const RequirementItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'met' && prop !== 'animated',
})<{ met: boolean; animated?: boolean }>(({ theme, met, animated }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1),
  borderRadius: theme.shape.borderRadius,
  background: met
    ? alpha(theme.palette.success.main, 0.08)
    : alpha(theme.palette.action.disabled, 0.04),
  transition: animated ? 'all 0.3s ease' : 'none',
  animation: animated ? `${slideInAnimation} 0.3s ease` : 'none',
  '& svg': {
    fontSize: '1rem',
    color: met ? theme.palette.success.main : theme.palette.text.disabled,
  },
}));

const StrengthLabel = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'strength' && prop !== 'animated',
})<{ strength: number; animated?: boolean }>(({ theme, strength, animated }) => {
  const getColor = () => {
    if (strength <= 20) return theme.palette.error;
    if (strength <= 40) return theme.palette.warning;
    if (strength <= 60) return theme.palette.info;
    if (strength <= 80) return theme.palette.success;
    return theme.palette.success;
  };

  const palette = getColor();

  return {
    background: alpha(palette.main, 0.1),
    color: palette.main,
    border: `1px solid ${alpha(palette.main, 0.3)}`,
    fontWeight: 600,
    animation: animated ? `${pulseAnimation} 2s ease infinite` : 'none',
  };
});

const StepsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Step = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'completed' && prop !== 'animated',
})<{ active: boolean; completed: boolean; animated?: boolean }>(
  ({ theme, active, completed, animated }) => ({
    flex: 1,
    height: 6,
    borderRadius: 3,
    background: completed
      ? `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`
      : active
        ? `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 100%)`
        : alpha(theme.palette.action.disabled, 0.2),
    transition: animated ? 'all 0.3s ease' : 'none',
    boxShadow: completed ? `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}` : 'none',
  }),
);

// Helper functions
const calculatePasswordStrength = (
  password: string,
  requirements: PasswordRequirements,
): number => {
  if (!password) return 0;

  let strength = 0;
  const checks = {
    length: password.length >= (requirements.minLength || 8),
    uppercase: !requirements.uppercase || /[A-Z]/.test(password),
    lowercase: !requirements.lowercase || /[a-z]/.test(password),
    numbers: !requirements.numbers || /\d/.test(password),
    special: !requirements.special || /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Base strength from length
  strength += Math.min(password.length * 3, 30);

  // Add points for meeting requirements
  if (checks.length) strength += 20;
  if (checks.uppercase) strength += 10;
  if (checks.lowercase) strength += 10;
  if (checks.numbers) strength += 15;
  if (checks.special) strength += 15;

  // Bonus for complexity
  if (password.length > 12) strength += 10;
  if (password.length > 16) strength += 10;

  return Math.min(strength, 100);
};

const getStrengthLabel = (strength: number): string => {
  if (strength <= 20) return 'Very Weak';
  if (strength <= 40) return 'Weak';
  if (strength <= 60) return 'Fair';
  if (strength <= 80) return 'Good';
  return 'Strong';
};

const getStrengthIcon = (strength: number) => {
  if (strength <= 40) return <WarningIcon />;
  if (strength <= 80) return <SecurityIcon />;
  return <SuccessIcon />;
};

// Main component
export const PasswordStrength: FC<PasswordStrengthProps> = ({
  value = '',
  showRequirements = true,
  requirements = defaultRequirements,
  showStrengthLabel = true,
  showSuggestions = false,
  variant = 'linear',
  animated = true,
  'data-testid': dataTestId,
}) => {
  const theme = useTheme();
  const { spacing, spacingPx } = useDensitySpacing();

  const strength = useMemo(
    () => calculatePasswordStrength(value, requirements),
    [value, requirements],
  );

  const requirementChecks = useMemo(() => {
    if (!value)
      return {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        special: false,
      };

    return {
      length: value.length >= (requirements.minLength || 8),
      uppercase: !requirements.uppercase || /[A-Z]/.test(value),
      lowercase: !requirements.lowercase || /[a-z]/.test(value),
      numbers: !requirements.numbers || /\d/.test(value),
      special: !requirements.special || /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
  }, [value, requirements]);

  const suggestions = useMemo(() => {
    const tips = [];
    if (!requirementChecks.length) tips.push('Use at least 8 characters');
    if (!requirementChecks.uppercase) tips.push('Add uppercase letters');
    if (!requirementChecks.lowercase) tips.push('Add lowercase letters');
    if (!requirementChecks.numbers) tips.push('Include numbers');
    if (!requirementChecks.special) tips.push('Add special characters');
    return tips;
  }, [requirementChecks]);

  const renderStrengthIndicator = () => {
    switch (variant) {
      case 'circular':
        return (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `conic-gradient(
                  ${theme.palette.success.main} 0deg ${strength * 3.6}deg,
                  ${alpha(theme.palette.action.disabled, 0.1)} ${strength * 3.6}deg 360deg
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, strength / 200)}`,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: theme.palette.background.paper,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {strength}%
                </Typography>
              </Box>
            </Box>
          </Box>
        );

      case 'steps': {
        const steps = 5;
        const activeStep = Math.ceil((strength / 100) * steps);
        return (
          <StepsContainer>
            {Array.from({ length: steps }, (_, i) => (
              <Step key={i} active={i === activeStep - 1} completed={i < activeStep - 1} animated={animated} />
            ))}
          </StepsContainer>
        );
      }

      default:
        return <StrengthBar variant="determinate" value={strength} strength={strength} animated={animated} />;
    }
  };

  return (
    <StrengthContainer animated={animated} data-testid={dataTestId} sx={{ padding: spacingPx(2) }}>
      {/* Base: 8px spacing between stack items, scales with density */}
      <Stack spacing={spacing(2)}>
        {showStrengthLabel && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Password Strength
            </Typography>
            {value.length > 0 && (
              <Fade in={true}>
                <StrengthLabel
                  label={getStrengthLabel(strength)}
                  icon={getStrengthIcon(strength)}
                  size="small"
                  strength={strength}
                  animated={animated}
                />
              </Fade>
            )}
          </Box>
        )}

        {renderStrengthIndicator()}

        {showRequirements && (
          <Fade in={value.length > 0}>
            {/* Base: 4px spacing between requirement items, scales with density */}
            <Stack spacing={spacing(1)}>
              <Typography variant="caption" color="text.secondary" fontWeight="medium">
                Requirements:
              </Typography>
              {requirements.minLength && (
                <RequirementItem met={requirementChecks.length} animated={animated}>
                  <RequirementIcon met={requirementChecks.length} />
                  <Typography variant="caption">
                    At least {requirements.minLength} characters
                  </Typography>
                </RequirementItem>
              )}
              {requirements.uppercase && (
                <RequirementItem met={requirementChecks.uppercase} animated={animated}>
                  <RequirementIcon met={requirementChecks.uppercase} />
                  <Typography variant="caption">One uppercase letter</Typography>
                </RequirementItem>
              )}
              {requirements.lowercase && (
                <RequirementItem met={requirementChecks.lowercase} animated={animated}>
                  <RequirementIcon met={requirementChecks.lowercase} />
                  <Typography variant="caption">One lowercase letter</Typography>
                </RequirementItem>
              )}
              {requirements.numbers && (
                <RequirementItem met={requirementChecks.numbers} animated={animated}>
                  <RequirementIcon met={requirementChecks.numbers} />
                  <Typography variant="caption">One number</Typography>
                </RequirementItem>
              )}
              {requirements.special && (
                <RequirementItem met={requirementChecks.special} animated={animated}>
                  <RequirementIcon met={requirementChecks.special} />
                  <Typography variant="caption">One special character</Typography>
                </RequirementItem>
              )}
            </Stack>
          </Fade>
        )}

        {showSuggestions && suggestions.length > 0 && value.length > 0 && (
          <Fade in={true}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="medium">
                Suggestions:
              </Typography>
              {/* Base: 4px margin-top, scales with density */}
              <Box sx={{ mt: spacing(1) }}>
                {suggestions.map((tip, index) => (
                  <Typography
                    key={index}
                    variant="caption"
                    display="block"
                    color="warning.main"
                    // Base: 8px margin-left, scales with density
                    sx={{ ml: spacing(2) }}
                  >
                    • {tip}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Stack>
    </StrengthContainer>
  );
};

// Export default
export default PasswordStrength;
