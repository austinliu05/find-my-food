import { renderHook } from '@testing-library/react-hooks';
import useDiningStatus from '../hooks/useDiningStatus';
import { isRattyOpen, isAndrewsOpen, isIvyOpen, isVDubOpen } from '../utils';
import { rattyHours, andrewsHours, ivyHours, vdubHours } from '../constants'

jest.mock('../constants', () => {
    // Require the actual module
    const actualConstants = jest.requireActual('../constants');
    
    return actualConstants
  });

jest.mock('../utils', () => {
    // Require the actual module
    const actualUtils = jest.requireActual('../utils');
    
    return actualUtils
  });

describe('Dining Hall Open Check', () => {
    beforeEach(() => {
        process.env.TZ = 'UTC';
        jest.useFakeTimers('modern');
      });

    it('Basic Testing all Dining Hall Hours', () => {
        jest.setSystemTime(new Date('2023-02-14T17:00:00Z')); 
        expect(isRattyOpen(rattyHours)).toBe(true);
        expect(isAndrewsOpen(andrewsHours)).toBe(true);
        expect(isIvyOpen(ivyHours)).toBe(true);
        expect(isVDubOpen(vdubHours)).toBe(true);
    });
    it('Testing Ivy Room Hours', () => {
        // closed Sunday at 12:00pm
        jest.setSystemTime(new Date('2023-02-12T17:00:00Z')); 
        expect(isIvyOpen(ivyHours)).toBe(false);
        // open Sunday at 7:00pm
        jest.setSystemTime(new Date('2023-02-12T22:00:00Z')); 
        expect(isIvyOpen(ivyHours)).toBe(true);
    });
    it('Testing VDub Hours', () => {
        // Closed on Sundays 
        jest.setSystemTime(new Date('2023-02-12T17:00:00Z')); 
        expect(isVDubOpen(vdubHours)).toBe(false);
        // Closed on Saturdays 
        jest.setSystemTime(new Date('2023-02-11T17:00:00Z')); 
        expect(isVDubOpen(vdubHours)).toBe(false);
    });
    it('Basic Testing all Dining Hall Hours (closed)', () => {
        jest.setSystemTime(new Date('2023-02-14T7:00:00Z')); 
        expect(isRattyOpen(rattyHours)).toBe(false);
        expect(isAndrewsOpen(andrewsHours)).toBe(false);
        expect(isIvyOpen(ivyHours)).toBe(false);
        expect(isVDubOpen(vdubHours)).toBe(false);
    });
});

describe('useDiningStatus', () => {
    it('Testing utility functions', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2023-02-14T19:00:00Z'));

        // Render the hook
        const { result } = renderHook(() => useDiningStatus());
        
        // Assert the initial state of the hook
        expect(result.current.ratty).toBe(true);
        expect(result.current.andrews).toBe(true);
        expect(result.current.ivy).toBe(false);
        expect(result.current.vdub).toBe(true);
    });
});
