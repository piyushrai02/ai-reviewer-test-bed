import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GreetingComponent } from './demo.component';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreetingComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  // ==================== Component Initialization Tests ====================

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default title property', () => {
      expect(component.title).toBe('Welcome to My Angular App!');
    });

    it('should initialize userName with default value "Guest"', () => {
      expect(component.userName).toBe('Guest');
    });

    it('should initialize initialUserName with default value "Guest"', () => {
      expect(component.initialUserName).toBe('Guest');
    });

    it('should initialize showDetails as false', () => {
      expect(component.showDetails).toBe(false);
    });

    it('should call ngOnInit on component initialization', () => {
      spyOn(console, 'log');
      component.ngOnInit();
      expect(console.log).toHaveBeenCalledWith('GreetingComponent initialized.');
    });

    it('should have nameChanged EventEmitter initialized', () => {
      expect(component.nameChanged).toBeDefined();
      expect(component.nameChanged.observers.length).toBe(0);
    });

    it('should have detailsToggled EventEmitter initialized', () => {
      expect(component.detailsToggled).toBeDefined();
      expect(component.detailsToggled.observers.length).toBe(0);
    });
  });

  // ==================== @Input defaultName Tests ====================

  describe('@Input defaultName setter', () => {
    it('should set userName when defaultName is provided', () => {
      component.defaultName = 'John';
      expect(component.userName).toBe('John');
    });

    it('should set initialUserName when defaultName is provided', () => {
      component.defaultName = 'Jane';
      expect(component.initialUserName).toBe('Jane');
    });

    it('should update both userName and initialUserName together', () => {
      component.defaultName = 'Alice';
      expect(component.userName).toBe('Alice');
      expect(component.initialUserName).toBe('Alice');
    });

    it('should not update userName when defaultName is null', () => {
      component.userName = 'ExistingUser';
      component.defaultName = null;
      expect(component.userName).toBe('ExistingUser');
    });

    it('should not update userName when defaultName is undefined', () => {
      component.userName = 'ExistingUser';
      component.defaultName = undefined;
      expect(component.userName).toBe('ExistingUser');
    });

    it('should not update userName when defaultName is empty string', () => {
      component.userName = 'ExistingUser';
      component.defaultName = '';
      expect(component.userName).toBe('ExistingUser');
    });

    it('should handle special characters in defaultName', () => {
      component.defaultName = 'John@Doe#123';
      expect(component.userName).toBe('John@Doe#123');
      expect(component.initialUserName).toBe('John@Doe#123');
    });

    it('should handle whitespace in defaultName', () => {
      component.defaultName = '  John Doe  ';
      expect(component.userName).toBe('  John Doe  ');
      expect(component.initialUserName).toBe('  John Doe  ');
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(1000);
      component.defaultName = longName;
      expect(component.userName).toBe(longName);
      expect(component.initialUserName).toBe(longName);
    });

    it('should handle unicode characters in defaultName', () => {
      component.defaultName = '李明';
      expect(component.userName).toBe('李明');
      expect(component.initialUserName).toBe('李明');
    });

    it('should handle emojis in defaultName', () => {
      component.defaultName = '😀🎉';
      expect(component.userName).toBe('😀🎉');
      expect(component.initialUserName).toBe('😀🎉');
    });
  });

  // ==================== onNameChange() Tests ====================

  describe('onNameChange()', () => {
    it('should log the current userName to console', () => {
      spyOn(console, 'log');
      component.userName = 'TestUser';
      component.onNameChange();
      expect(console.log).toHaveBeenCalledWith('Name input changed to:', 'TestUser');
    });

    it('should emit nameChanged event with current userName', (done) => {
      component.userName = 'NewName';
      component.nameChanged.subscribe((name: string) => {
        expect(name).toBe('NewName');
        done();
      });
      component.onNameChange();
    });

    it('should emit nameChanged event when userName is empty', (done) => {
      component.userName = '';
      component.nameChanged.subscribe((name: string) => {
        expect(name).toBe('');
        done();
      });
      component.onNameChange();
    });

    it('should emit nameChanged event multiple times when called multiple times', () => {
      const emittedValues: string[] = [];
      component.nameChanged.subscribe((name: string) => {
        emittedValues.push(name);
      });

      component.userName = 'First';
      component.onNameChange();
      component.userName = 'Second';
      component.onNameChange();
      component.userName = 'Third';
      component.onNameChange();

      expect(emittedValues).toEqual(['First', 'Second', 'Third']);
    });

    it('should handle special characters in userName when emitting', (done) => {
      component.userName = '<script>alert("test")</script>';
      component.nameChanged.subscribe((name: string) => {
        expect(name).toBe('<script>alert("test")</script>');
        done();
      });
      component.onNameChange();
    });

    it('should emit current userName even if it contains only whitespace', (done) => {
      component.userName = '   ';
      component.nameChanged.subscribe((name: string) => {
        expect(name).toBe('   ');
        done();
      });
      component.onNameChange();
    });
  });

  // ==================== resetName() Tests ====================

  describe('resetName()', () => {
    it('should reset userName to initialUserName', () => {
      component.initialUserName = 'InitialName';
      component.userName = 'ChangedName';
      component.resetName();
      expect(component.userName).toBe('InitialName');
    });

    it('should reset userName to "Guest" when using default values', () => {
      component.userName = 'SomeUser';
      component.resetName();
      expect(component.userName).toBe('Guest');
    });

    it('should emit nameChanged event after reset', (done) => {
      component.initialUserName = 'ResetValue';
      component.userName = 'CurrentValue';
      component.nameChanged.subscribe((name: string) => {
        expect(name).toBe('ResetValue');
        done();
      });
      component.resetName();
    });

    it('should emit nameChanged with the reset value', () => {
      const emittedValues: string[] = [];
      component.nameChanged.subscribe((name: string) => {
        emittedValues.push(name);
      });

      component.initialUserName = 'Original';
      component.userName = 'Modified';
      component.resetName();

      expect(emittedValues).toContain('Original');
    });

    it('should handle reset when initialUserName is empty', () => {
      component.initialUserName = '';
      component.userName = 'NotEmpty';
      component.resetName();
      expect(component.userName).toBe('');
    });

    it('should reset to custom initialUserName set via @Input', () => {
      component.defaultName = 'CustomDefault';
      component.userName = 'Changed';
      component.resetName();
      expect(component.userName).toBe('CustomDefault');
    });

    it('should be idempotent - calling multiple times has same effect', () => {
      component.initialUserName = 'Initial';
      component.userName = 'Changed';
      component.resetName();
      const firstResetValue = component.userName;
      component.resetName();
      expect(component.userName).toBe(firstResetValue);
    });

    it('should emit event each time resetName is called', () => {
      let emitCount = 0;
      component.nameChanged.subscribe(() => {
        emitCount++;
      });

      component.resetName();
      component.resetName();
      component.resetName();

      expect(emitCount).toBe(3);
    });
  });

  // ==================== toggleDetails() Tests ====================

  describe('toggleDetails()', () => {
    it('should toggle showDetails from false to true', () => {
      component.showDetails = false;
      component.toggleDetails();
      expect(component.showDetails).toBe(true);
    });

    it('should toggle showDetails from true to false', () => {
      component.showDetails = true;
      component.toggleDetails();
      expect(component.showDetails).toBe(false);
    });

    it('should emit detailsToggled event with new state', (done) => {
      component.showDetails = false;
      component.detailsToggled.subscribe((state: boolean) => {
        expect(state).toBe(true);
        done();
      });
      component.toggleDetails();
    });

    it('should emit correct state after multiple toggles', () => {
      const emittedStates: boolean[] = [];
      component.detailsToggled.subscribe((state: boolean) => {
        emittedStates.push(state);
      });

      component.showDetails = false;
      component.toggleDetails(); // true
      component.toggleDetails(); // false
      component.toggleDetails(); // true

      expect(emittedStates).toEqual([true, false, true]);
    });

    it('should alternate between true and false on consecutive calls', () => {
      component.showDetails = false;
      component.toggleDetails();
      expect(component.showDetails).toBe(true);
      component.toggleDetails();
      expect(component.showDetails).toBe(false);
      component.toggleDetails();
      expect(component.showDetails).toBe(true);
    });

    it('should emit event every time toggle is called', () => {
      let emitCount = 0;
      component.detailsToggled.subscribe(() => {
        emitCount++;
      });

      component.toggleDetails();
      component.toggleDetails();
      component.toggleDetails();
      component.toggleDetails();

      expect(emitCount).toBe(4);
    });
  });

  // ==================== Integration Tests ====================

  describe('Integration Tests - Component Behavior', () => {
    it('should maintain state consistency when combining operations', () => {
      component.defaultName = 'TestUser';
      expect(component.userName).toBe('TestUser');
      expect(component.initialUserName).toBe('TestUser');

      component.userName = 'ModifiedUser';
      component.onNameChange();

      component.resetName();
      expect(component.userName).toBe('TestUser');
    });

    it('should handle rapid state changes correctly', () => {
      const nameEvents: string[] = [];
      const detailsEvents: boolean[] = [];

      component.nameChanged.subscribe(name => nameEvents.push(name));
      component.detailsToggled.subscribe(state => detailsEvents.push(state));

      component.userName = 'User1';
      component.onNameChange();
      component.toggleDetails();
      component.userName = 'User2';
      component.onNameChange();
      component.resetName();
      component.toggleDetails();

      expect(nameEvents.length).toBe(3);
      expect(detailsEvents.length).toBe(2);
    });

    it('should properly emit events in workflow: input -> change -> reset', (done) => {
      const emittedNames: string[] = [];
      component.nameChanged.subscribe(name => {
        emittedNames.push(name);
        if (emittedNames.length === 2) {
          expect(emittedNames[0]).toBe('NewUser');
          expect(emittedNames[1]).toBe('Guest');
          done();
        }
      });

      component.userName = 'NewUser';
      component.onNameChange();
      component.resetName();
    });
  });

  // ==================== Edge Cases and Error Handling ====================

  describe('Edge Cases', () => {
    it('should handle userName with only numbers', () => {
      component.userName = '12345';
      component.onNameChange();
      expect(component.userName).toBe('12345');
    });

    it('should handle userName with SQL injection attempt', () => {
      const sqlInjection = "'; DROP TABLE users; --";
      component.userName = sqlInjection;
      component.onNameChange();
      expect(component.userName).toBe(sqlInjection);
    });

    it('should handle userName with HTML tags', () => {
      const htmlTags = '<div onclick="alert()">Test</div>';
      component.userName = htmlTags;
      expect(component.userName).toBe(htmlTags);
    });

    it('should handle null-like string values', () => {
      component.userName = 'null';
      expect(component.userName).toBe('null');
      component.userName = 'undefined';
      expect(component.userName).toBe('undefined');
    });

    it('should handle very long input gracefully', () => {
      const veryLongName = 'A'.repeat(10000);
      component.userName = veryLongName;
      component.onNameChange();
      expect(component.userName.length).toBe(10000);
    });

    it('should handle rapid toggle calls', () => {
      const initialState = component.showDetails;
      for (let i = 0; i < 100; i++) {
        component.toggleDetails();
      }
      // After even number of toggles, should be back to initial state
      expect(component.showDetails).toBe(initialState);
    });

    it('should handle resetName when no changes were made', () => {
      const originalName = component.userName;
      component.resetName();
      expect(component.userName).toBe(originalName);
    });

    it('should maintain type safety with string properties', () => {
      expect(typeof component.userName).toBe('string');
      expect(typeof component.title).toBe('string');
      expect(typeof component.initialUserName).toBe('string');
    });

    it('should maintain type safety with boolean property', () => {
      expect(typeof component.showDetails).toBe('boolean');
    });
  });

  // ==================== Event Emitter Subscription Tests ====================

  describe('Event Emitter Subscriptions', () => {
    it('should allow multiple subscribers to nameChanged', (done) => {
      let subscriber1Called = false;
      let subscriber2Called = false;

      component.nameChanged.subscribe(() => {
        subscriber1Called = true;
      });

      component.nameChanged.subscribe(() => {
        subscriber2Called = true;
        if (subscriber1Called && subscriber2Called) {
          done();
        }
      });

      component.userName = 'Test';
      component.onNameChange();
    });

    it('should allow multiple subscribers to detailsToggled', (done) => {
      let subscriber1Called = false;
      let subscriber2Called = false;

      component.detailsToggled.subscribe(() => {
        subscriber1Called = true;
      });

      component.detailsToggled.subscribe(() => {
        subscriber2Called = true;
        if (subscriber1Called && subscriber2Called) {
          done();
        }
      });

      component.toggleDetails();
    });

    it('should not fail when emitting events with no subscribers', () => {
      expect(() => {
        component.onNameChange();
        component.toggleDetails();
      }).not.toThrow();
    });
  });

  // ==================== State Management Tests ====================

  describe('State Management', () => {
    it('should independently manage userName and showDetails state', () => {
      component.userName = 'TestUser';
      component.showDetails = true;

      component.resetName();
      expect(component.showDetails).toBe(true);

      component.toggleDetails();
      expect(component.userName).toBe('Guest');
    });

    it('should preserve title property through state changes', () => {
      const originalTitle = component.title;
      component.userName = 'Changed';
      component.onNameChange();
      component.toggleDetails();
      component.resetName();
      expect(component.title).toBe(originalTitle);
    });

    it('should maintain initialUserName immutability after set', () => {
      component.defaultName = 'Initial';
      const savedInitial = component.initialUserName;

      component.userName = 'Changed1';
      component.userName = 'Changed2';
      component.onNameChange();

      expect(component.initialUserName).toBe(savedInitial);
    });
  });

  // ==================== Lifecycle Hook Tests ====================

  describe('Lifecycle Hooks', () => {
    it('should call ngOnInit exactly once during component lifecycle', () => {
      spyOn(console, 'log');
      const newFixture = TestBed.createComponent(GreetingComponent);
      newFixture.detectChanges();
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('GreetingComponent initialized.');
      newFixture.destroy();
    });

    it('should have all properties initialized before ngOnInit is called', () => {
      const newComponent = new GreetingComponent();
      expect(newComponent.title).toBeDefined();
      expect(newComponent.userName).toBeDefined();
      expect(newComponent.initialUserName).toBeDefined();
      expect(newComponent.showDetails).toBeDefined();
      newComponent.ngOnInit();
    });
  });

  // ==================== Constructor Tests ====================

  describe('Constructor', () => {
    it('should initialize component without errors', () => {
      expect(() => {
        const newComponent = new GreetingComponent();
      }).not.toThrow();
    });

    it('should have all EventEmitters initialized after construction', () => {
      const newComponent = new GreetingComponent();
      expect(newComponent.nameChanged).toBeDefined();
      expect(newComponent.detailsToggled).toBeDefined();
    });
  });

  // ==================== Complex Scenario Tests ====================

  describe('Complex Scenarios', () => {
    it('should handle workflow: set default -> modify -> reset -> toggle', () => {
      const events: any[] = [];

      component.nameChanged.subscribe(name => events.push({ type: 'name', value: name }));
      component.detailsToggled.subscribe(state => events.push({ type: 'details', value: state }));

      component.defaultName = 'StartUser';
      component.userName = 'ModifiedUser';
      component.onNameChange();
      component.resetName();
      component.toggleDetails();

      expect(events.length).toBe(3);
      expect(events[0]).toEqual({ type: 'name', value: 'ModifiedUser' });
      expect(events[1]).toEqual({ type: 'name', value: 'StartUser' });
      expect(events[2]).toEqual({ type: 'details', value: true });
    });

    it('should handle alternating between methods', () => {
      const states: { userName: string; showDetails: boolean }[] = [];

      for (let i = 0; i < 5; i++) {
        component.userName = `User${i}`;
        component.toggleDetails();
        states.push({
          userName: component.userName,
          showDetails: component.showDetails
        });
      }

      expect(states.length).toBe(5);
      expect(states[0].showDetails).toBe(true);
      expect(states[1].showDetails).toBe(false);
      expect(states[2].showDetails).toBe(true);
    });
  });

  // ==================== Performance and Stress Tests ====================

  describe('Performance Tests', () => {
    it('should handle 1000 rapid name changes efficiently', () => {
      const startTime = performance.now();
      for (let i = 0; i < 1000; i++) {
        component.userName = `User${i}`;
        component.onNameChange();
      }
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    });

    it('should handle 1000 rapid toggles efficiently', () => {
      const startTime = performance.now();
      for (let i = 0; i < 1000; i++) {
        component.toggleDetails();
      }
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('should handle multiple simultaneous subscriptions efficiently', (done) => {
      let completedSubscriptions = 0;
      const totalSubscriptions = 100;

      for (let i = 0; i < totalSubscriptions; i++) {
        component.nameChanged.subscribe(() => {
          completedSubscriptions++;
          if (completedSubscriptions === totalSubscriptions) {
            done();
          }
        });
      }

      component.onNameChange();
    });
  });
});

// ==================== DOM and Template Rendering Tests ====================

describe('DOM and Template Rendering', () => {
  beforeEach(() => {
    fixture.detectChanges();
  });

  describe('Initial Template Rendering', () => {
    it('should render the greeting container', () => {
      const container = compiled.querySelector('.greeting-container');
      expect(container).toBeTruthy();
    });

    it('should display the title in h2 element', () => {
      const h2 = compiled.querySelector('h2');
      expect(h2?.textContent).toContain('Welcome to My Angular App!');
    });

    it('should render userName in the greeting paragraph', () => {
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('Guest');
    });

    it('should render input field with correct attributes', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('text');
      expect(input.placeholder).toBe('Your Name');
    });

    it('should have a label for the name input', () => {
      const label = compiled.querySelector('label[for="nameInput"]');
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Enter your name:');
    });

    it('should render reset button', () => {
      const buttons = compiled.querySelectorAll('button');
      const resetButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Reset Name')
      );
      expect(resetButton).toBeTruthy();
    });

    it('should render toggle details button', () => {
      const buttons = compiled.querySelectorAll('button');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Toggle Details')
      );
      expect(toggleButton).toBeTruthy();
    });

    it('should have input-section div', () => {
      const inputSection = compiled.querySelector('.input-section');
      expect(inputSection).toBeTruthy();
    });
  });

  describe('Conditional Template Rendering (*ngIf)', () => {
    it('should show message div when userName has length > 0', () => {
      component.userName = 'TestUser';
      fixture.detectChanges();
      const messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeTruthy();
    });

    it('should not show message div when userName is empty', () => {
      component.userName = '';
      fixture.detectChanges();
      const messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeFalsy();
    });

    it('should display correct message text with userName', () => {
      component.userName = 'Alice';
      fixture.detectChanges();
      const messageDiv = compiled.querySelector('.message');
      expect(messageDiv?.textContent).toContain('Nice to meet you, Alice!');
    });

    it('should hide details section by default', () => {
      component.showDetails = false;
      fixture.detectChanges();
      const detailsSection = Array.from(compiled.querySelectorAll('div')).find(
        div => div.querySelector('h3')?.textContent === 'More Details'
      );
      expect(detailsSection).toBeFalsy();
    });

    it('should show details section when showDetails is true', () => {
      component.showDetails = true;
      fixture.detectChanges();
      const h3 = Array.from(compiled.querySelectorAll('h3')).find(
        h => h.textContent === 'More Details'
      );
      expect(h3).toBeTruthy();
    });

    it('should display details description when visible', () => {
      component.showDetails = true;
      fixture.detectChanges();
      const text = compiled.textContent;
      expect(text).toContain('This is a demonstration of Angular data binding and event handling.');
    });
  });

  describe('Data Binding Tests', () => {
    it('should bind title to template', () => {
      component.title = 'Custom Title';
      fixture.detectChanges();
      const h2 = compiled.querySelector('h2');
      expect(h2?.textContent).toBe('Custom Title');
    });

    it('should update userName in template when property changes', () => {
      component.userName = 'NewUser';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('NewUser');
    });

    it('should reflect userName changes in multiple locations', () => {
      component.userName = 'MultiUser';
      fixture.detectChanges();
      const text = compiled.textContent;
      expect(text).toContain('MultiUser');
      // Should appear in greeting and message
      const occurrences = (text?.match(/MultiUser/g) || []).length;
      expect(occurrences).toBeGreaterThan(1);
    });

    it('should update message div dynamically when userName changes', () => {
      component.userName = '';
      fixture.detectChanges();
      let messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeFalsy();

      component.userName = 'Dynamic';
      fixture.detectChanges();
      messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeTruthy();
      expect(messageDiv?.textContent).toContain('Dynamic');
    });
  });

  describe('Two-Way Data Binding (ngModel)', () => {
    it('should have ngModel binding on input field', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      expect(input).toBeTruthy();
      // Input should exist with ngModel directive
    });

    it('should update component property when input value changes', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      input.value = 'InputTest';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.userName).toBe('InputTest');
    });

    it('should update input value when component property changes', () => {
      component.userName = 'PropTest';
      fixture.detectChanges();
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      expect(input.value).toBe('PropTest');
    });

    it('should synchronize input and display in real-time', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      input.value = 'RealTime';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('RealTime');
    });
  });

  describe('Event Handling Tests', () => {
    it('should call onNameChange when input event fires', () => {
      spyOn(component, 'onNameChange');
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.onNameChange).toHaveBeenCalled();
    });

    it('should call resetName when reset button is clicked', () => {
      spyOn(component, 'resetName');
      const buttons = compiled.querySelectorAll('button');
      const resetButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Reset Name')
      ) as HTMLButtonElement;
      resetButton.click();
      expect(component.resetName).toHaveBeenCalled();
    });

    it('should call toggleDetails when toggle button is clicked', () => {
      spyOn(component, 'toggleDetails');
      const buttons = compiled.querySelectorAll('button');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Toggle Details')
      ) as HTMLButtonElement;
      toggleButton.click();
      expect(component.toggleDetails).toHaveBeenCalled();
    });

    it('should update UI when reset button is clicked', () => {
      component.userName = 'BeforeReset';
      fixture.detectChanges();
      
      const buttons = compiled.querySelectorAll('button');
      const resetButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Reset Name')
      ) as HTMLButtonElement;
      resetButton.click();
      fixture.detectChanges();
      
      expect(component.userName).toBe('Guest');
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('Guest');
    });

    it('should toggle details visibility when button is clicked', () => {
      component.showDetails = false;
      fixture.detectChanges();
      
      const buttons = compiled.querySelectorAll('button');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Toggle Details')
      ) as HTMLButtonElement;
      
      toggleButton.click();
      fixture.detectChanges();
      
      const h3 = Array.from(compiled.querySelectorAll('h3')).find(
        h => h.textContent === 'More Details'
      );
      expect(h3).toBeTruthy();
    });
  });

  describe('CSS Class Tests', () => {
    it('should have greeting-container class on main div', () => {
      const container = compiled.querySelector('.greeting-container');
      expect(container).toBeTruthy();
    });

    it('should have user-name class on span', () => {
      const span = compiled.querySelector('.user-name');
      expect(span).toBeTruthy();
    });

    it('should have input-section class on input container', () => {
      const inputSection = compiled.querySelector('.input-section');
      expect(inputSection).toBeTruthy();
    });

    it('should have message class on conditional message div', () => {
      component.userName = 'Test';
      fixture.detectChanges();
      const messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeTruthy();
    });
  });

  describe('Integration: User Interaction Flow', () => {
    it('should handle complete user flow: type -> display -> reset', () => {
      // Type in input
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      input.value = 'FlowTest';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // Check display
      let span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('FlowTest');
      
      // Reset
      const buttons = compiled.querySelectorAll('button');
      const resetButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Reset Name')
      ) as HTMLButtonElement;
      resetButton.click();
      fixture.detectChanges();
      
      // Check reset
      span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('Guest');
    });

    it('should show/hide message based on input', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      
      // Start with empty
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeFalsy();
      
      // Type something
      input.value = 'ShowMessage';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeTruthy();
      
      // Clear again
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeFalsy();
    });

    it('should handle multiple toggle clicks', () => {
      const buttons = compiled.querySelectorAll('button');
      const toggleButton = Array.from(buttons).find(btn => 
        btn.textContent?.includes('Toggle Details')
      ) as HTMLButtonElement;
      
      // Start hidden
      expect(component.showDetails).toBe(false);
      
      // First click - show
      toggleButton.click();
      fixture.detectChanges();
      let h3 = Array.from(compiled.querySelectorAll('h3')).find(
        h => h.textContent === 'More Details'
      );
      expect(h3).toBeTruthy();
      
      // Second click - hide
      toggleButton.click();
      fixture.detectChanges();
      h3 = Array.from(compiled.querySelectorAll('h3')).find(
        h => h.textContent === 'More Details'
      );
      expect(h3).toBeFalsy();
      
      // Third click - show again
      toggleButton.click();
      fixture.detectChanges();
      h3 = Array.from(compiled.querySelectorAll('h3')).find(
        h => h.textContent === 'More Details'
      );
      expect(h3).toBeTruthy();
    });
  });

  describe('Edge Cases in Template', () => {
    it('should handle very long userName in template', () => {
      const longName = 'A'.repeat(500);
      component.userName = longName;
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe(longName);
    });

    it('should properly escape HTML in userName', () => {
      component.userName = '<script>alert("xss")</script>';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      // Angular automatically escapes HTML
      expect(span?.innerHTML).not.toContain('<script>');
      expect(span?.textContent).toContain('<script>');
    });

    it('should handle special characters in template display', () => {
      component.userName = '&<>"\'';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('&<>"\'');
    });

    it('should handle empty userName display', () => {
      component.userName = '';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('');
    });

    it('should handle whitespace-only userName', () => {
      component.userName = '   ';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('   ');
    });

    it('should render unicode characters correctly', () => {
      component.userName = '你好世界 🌍';
      fixture.detectChanges();
      const span = compiled.querySelector('.user-name');
      expect(span?.textContent).toBe('你好世界 🌍');
    });
  });

  describe('Template Structure Validation', () => {
    it('should have exactly two buttons', () => {
      const buttons = compiled.querySelectorAll('button');
      expect(buttons.length).toBe(2);
    });

    it('should have input field inside input-section', () => {
      const inputSection = compiled.querySelector('.input-section');
      const input = inputSection?.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should have label before input in input-section', () => {
      const inputSection = compiled.querySelector('.input-section');
      const children = Array.from(inputSection?.children || []);
      const labelIndex = children.findIndex(el => el.tagName === 'LABEL');
      const inputIndex = children.findIndex(el => el.tagName === 'INPUT');
      expect(labelIndex).toBeLessThan(inputIndex);
    });

    it('should have all content within greeting-container', () => {
      const container = compiled.querySelector('.greeting-container');
      const h2 = compiled.querySelector('h2');
      expect(container?.contains(h2 as Node)).toBe(true);
    });

    it('should have message div appear after buttons section', () => {
      component.userName = 'Test';
      fixture.detectChanges();
      // Message div should exist in DOM
      const messageDiv = compiled.querySelector('.message');
      expect(messageDiv).toBeTruthy();
    });
  });

  describe('Accessibility Tests', () => {
    it('should have proper label-input association', () => {
      const label = compiled.querySelector('label[for="nameInput"]');
      const input = compiled.querySelector('#nameInput');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(label?.getAttribute('for')).toBe('nameInput');
    });

    it('should have meaningful button text', () => {
      const buttons = compiled.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have heading hierarchy', () => {
      component.showDetails = true;
      fixture.detectChanges();
      const h2 = compiled.querySelector('h2');
      const h3 = compiled.querySelector('h3');
      expect(h2).toBeTruthy();
      expect(h3).toBeTruthy();
    });

    it('should have placeholder text on input', () => {
      const input = compiled.querySelector('#nameInput') as HTMLInputElement;
      expect(input.placeholder).toBeTruthy();
      expect(input.placeholder).toBe('Your Name');
    });
  });

  describe('Performance: Template Updates', () => {
    it('should efficiently update template with multiple property changes', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        component.userName = `User${i}`;
        fixture.detectChanges();
      }
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(2000); // Should complete in under 2 seconds
    });

    it('should handle rapid toggle of conditional sections', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 50; i++) {
        component.showDetails = !component.showDetails;
        fixture.detectChanges();
      }
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});