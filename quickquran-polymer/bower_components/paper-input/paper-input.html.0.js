

  Polymer('paper-input', {

    publish: {
      /**
       * The label for this input. It normally appears as grey text inside
       * the text input and disappears once the user enters text.
       *
       * @attribute label
       * @type string
       * @default ''
       */
      label: '',

      /**
       * If true, the label will "float" above the text input once the
       * user enters text instead of disappearing.
       *
       * @attribute floatingLabel
       * @type boolean
       * @default false
       */
      floatingLabel: false,

      /**
       * Set to true to style the element as disabled.
       *
       * @attribute disabled
       * @type boolean
       * @default false
       */
      disabled: {value: false, reflect: true},

      value: '',

      committedValue: ''

    },

    valueChanged: function() {
      this.$.decorator.updateLabelVisibility(this.value);
    },

    changeAction: function(e) {
      if (!window.ShadowDOMPolyfill) {
        // re-fire event that does not bubble across shadow roots
        this.fire('change', null, this);
      }
    }

  });

