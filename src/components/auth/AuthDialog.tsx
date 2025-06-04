import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export const AuthDialog = ({ isOpen, onOpenChange, mode, onModeChange }: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <span className="text-[#ff6600] text-4xl font-bold">Food</span>
            <span className="text-black text-4xl font-bold">Swift</span>
          </div>
          
          {mode === 'signin' ? (
            <SignInForm onModeChange={onModeChange} onClose={() => onOpenChange(false)} />
          ) : (
            <SignUpForm onModeChange={onModeChange} onClose={() => onOpenChange(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};