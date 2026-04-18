/*
 * Advanced Browser Activity Monitoring
 * Tracks all suspicious browser behavior in real-time
 */

class BrowserActivityMonitor {
    constructor() {
        this.activities = [];
        this.tabSwitches = 0;
        this.copyPasteAttempts = 0;
        this.fullscreenExits = 0;
        this.windowMinimizes = 0;
        this.devtoolsDetected = false;
        this.suspiciousKeystrokes = 0;
        this.windowBlurs = 0;
        
        this.isMonitoring = false;
        this.activityCallback = null;
        
        // Keyboard shortcut detection
        this.suspiciousShortcuts = [
            'ctrl+c', 'cmd+c',      // Copy
            'ctrl+v', 'cmd+v',      // Paste
            'ctrl+x', 'cmd+x',      // Cut
            'ctrl+a', 'cmd+a',      // Select all
            'ctrl+f', 'cmd+f',      // Find
            'f12',                  // DevTools
            'ctrl+shift+i',         // DevTools
            'ctrl+shift+j',         // DevTools
            'ctrl+shift+k',         // DevTools
            'ctrl+shift+c',         // DevTools
            'alt+f4',               // Close window
            'ctrl+alt+delete',      // Task manager
            'alt+tab', 'cmd+tab',  // Task switcher
            'super',                // Windows key
            'cmd+space'             // Spotlight
        ];
        
        this.init();
    }
    
    init() {
        console.log('[Monitor] Initializing browser activity monitor');
        
        // Tab visibility detection
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.logActivity('tab_hidden', { timestamp: new Date().toISOString() });
                this.tabSwitches++;
            } else {
                this.logActivity('tab_visible', { timestamp: new Date().toISOString() });
            }
        });
        
        // Window focus detection
        window.addEventListener('blur', () => {
            this.logActivity('window_blur', { timestamp: new Date().toISOString() });
            this.windowBlurs++;
        });
        
        window.addEventListener('focus', () => {
            this.logActivity('window_focus', { timestamp: new Date().toISOString() });
        });
        
        // Copy/Paste detection
        document.addEventListener('copy', (e) => {
            this.logActivity('copy_attempt', {
                timestamp: new Date().toISOString(),
                text_length: document.getSelection().toString().length
            });
            this.copyPasteAttempts++;
        });
        
        document.addEventListener('paste', (e) => {
            this.logActivity('paste_attempt', {
                timestamp: new Date().toISOString()
            });
            this.copyPasteAttempts++;
        });
        
        document.addEventListener('cut', (e) => {
            this.logActivity('cut_attempt', {
                timestamp: new Date().toISOString()
            });
            this.copyPasteAttempts++;
        });
        
        // Fullscreen detection
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.logActivity('fullscreen_exit', { timestamp: new Date().toISOString() });
                this.fullscreenExits++;
            }
        });
        
        // Keyboard detection
        document.addEventListener('keydown', (e) => {
            this.detectSuspiciousKeystrokes(e);
        });
        
        // Right-click context menu
        document.addEventListener('contextmenu', (e) => {
            this.logActivity('context_menu_attempt', {
                timestamp: new Date().toISOString(),
                target: e.target.tagName
            });
        });
        
        // Drag and drop detection
        document.addEventListener('dragstart', (e) => {
            this.logActivity('drag_attempt', {
                timestamp: new Date().toISOString()
            });
        });
        
        // DevTools detection (basic)
        this.setupDevToolsDetection();
        
        // Mouse state tracking
        this.setupMouseTracking();
        
        console.log('[Monitor] ✓ Browser activity monitoring initialized');
    }
    
    logActivity(activityType, data) {
        const activity = {
            type: activityType,
            timestamp: new Date().toISOString(),
            data: data,
            severity: this.getActivitySeverity(activityType)
        };
        
        this.activities.push(activity);
        
        console.log(`[Monitor] Activity logged: ${activityType}`, data);
        
        // Callback to send to server
        if (this.activityCallback) {
            this.activityCallback(activity);
        }
    }
    
    detectSuspiciousKeystrokes(event) {
        const key = event.key.toLowerCase();
        const ctrl = event.ctrlKey || event.metaKey;
        const shift = event.shiftKey;
        const alt = event.altKey;
        
        // Build key combination string
        let combo = [];
        if (ctrl) combo.push('ctrl');
        if (shift) combo.push('shift');
        if (alt) combo.push('alt');
        combo.push(key);
        const shortcut = combo.join('+');
        
        // Check against suspicious shortcuts
        for (let sus of this.suspiciousShortcuts) {
            if (shortcut.includes(sus) || sus.includes(shortcut)) {
                this.logActivity('suspicious_keystroke', {
                    timestamp: new Date().toISOString(),
                    keystroke: shortcut,
                    keys: {
                        ctrl: ctrl,
                        shift: shift,
                        alt: alt,
                        key: key
                    }
                });
                this.suspiciousKeystrokes++;
                
                // Prevent default behavior
                event.preventDefault();
                return;
            }
        }
    }
    
    setupDevToolsDetection() {
        // Check DevTools size
        const checkDevTools = () => {
            const devToolThreshold = 160;
            const isDevToolsOpen = window.outerHeight - window.innerHeight > devToolThreshold ||
                                  window.outerWidth - window.innerWidth > devToolThreshold;
            
            if (isDevToolsOpen && !this.devtoolsDetected) {
                this.logActivity('devtools_opened', {
                    timestamp: new Date().toISOString()
                });
                this.devtoolsDetected = true;
            }
        };
        
        setInterval(checkDevTools, 2000);
    }
    
    setupMouseTracking() {
        let mouseOutCount = 0;
        let lastMouseOut = null;
        
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget) {
                mouseOutCount++;
                lastMouseOut = new Date();
                this.logActivity('mouse_left_window', {
                    timestamp: new Date().toISOString(),
                    count: mouseOutCount
                });
            }
        });
    }
    
    getActivitySeverity(activityType) {
        const severities = {
            'copy_attempt': 'high',
            'paste_attempt': 'high',
            'cut_attempt': 'high',
            'devtools_opened': 'critical',
            'suspicious_keystroke': 'high',
            'tab_hidden': 'warning',
            'window_blur': 'low',
            'fullscreen_exit': 'medium',
            'context_menu_attempt': 'medium',
            'drag_attempt': 'medium'
        };
        
        return severities[activityType] || 'info';
    }
    
    setSuspicionCallback(callback) {
        this.activityCallback = callback;
    }
    
    getSummary() {
        return {
            total_activities: this.activities.length,
            tab_switches: this.tabSwitches,
            copy_paste_attempts: this.copyPasteAttempts,
            fullscreen_exits: this.fullscreenExits,
            suspicious_keystrokes: this.suspiciousKeystrokes,
            window_blurs: this.windowBlurs,
            devtools_detected: this.devtoolsDetected,
            recent_activities: this.activities.slice(-20)
        };
    }
    
    getActivitiesByType(type) {
        return this.activities.filter(a => a.type === type);
    }
    
    getRiskScore() {
        let score = 0;
        score += this.tabSwitches * 40;
        score += this.copyPasteAttempts * 45;
        score += this.fullscreenExits * 25;
        score += this.suspiciousKeystrokes * 20;
        score += this.windowBlurs * 5;
        score += this.devtoolsDetected ? 50 : 0;
        return Math.min(100, score);
    }
    
    reset() {
        this.activities = [];
        this.tabSwitches = 0;
        this.copyPasteAttempts = 0;
        this.fullscreenExits = 0;
        this.windowMinimizes = 0;
        this.devtoolsDetected = false;
        this.suspiciousKeystrokes = 0;
        this.windowBlurs = 0;
    }
}

// Export for use in templates
window.BrowserActivityMonitor = BrowserActivityMonitor;
