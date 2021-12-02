"use strict";var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function __(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(__.prototype=o.prototype,new __)}}();Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),react_bootstrap_1=require("react-bootstrap"),Context_1=require("./Context"),LayerService_1=require("sabre-ngv-core/services/LayerService"),Dialog=function(e){function Dialog(){return null!==e&&e.apply(this,arguments)||this}return __extends(Dialog,e),Dialog.prototype.handleModalClose=function(){Context_1.getService(LayerService_1.LayerService).clearLayer(42)},Dialog.prototype.render=function(){var e=this;return React.createElement(react_bootstrap_1.Modal.Dialog,{className:"react-modal"},React.createElement(react_bootstrap_1.Modal.Header,{closeButton:!0,onHide:function(){e.handleModalClose()}},React.createElement(react_bootstrap_1.Modal.Title,null,this.props.title)),React.createElement(react_bootstrap_1.Modal.Body,null,this.props.children),React.createElement(react_bootstrap_1.Modal.Footer,null,React.createElement(react_bootstrap_1.Button,{onClick:this.handleModalClose,className:"btn btn-secondary"},"Close"),this.props.actionButtons))},Dialog}(React.Component);exports.Dialog=Dialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWxvZyBjb3B5LmpzIl0sIm5hbWVzIjpbIl9fZXh0ZW5kcyIsInRoaXMiLCJlIiwidCIsIm8iLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwiaGFzT3duUHJvcGVydHkiLCJfXyIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJSZWFjdCIsInJlcXVpcmUiLCJyZWFjdF9ib290c3RyYXBfMSIsIkNvbnRleHRfMSIsIkxheWVyU2VydmljZV8xIiwiRGlhbG9nIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJoYW5kbGVNb2RhbENsb3NlIiwiZ2V0U2VydmljZSIsIkxheWVyU2VydmljZSIsImNsZWFyTGF5ZXIiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiTW9kYWwiLCJjbGFzc05hbWUiLCJIZWFkZXIiLCJjbG9zZUJ1dHRvbiIsIm9uSGlkZSIsIlRpdGxlIiwicHJvcHMiLCJ0aXRsZSIsIkJvZHkiLCJjaGlsZHJlbiIsIkZvb3RlciIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJhY3Rpb25CdXR0b25zIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxhQUFhLElBQUlBLFVBQVVDLE1BQU1BLEtBQUtELFdBQVcsV0FBVyxJQUFJRSxFQUFFLFNBQVNDLEVBQUVDLEdBQUcsT0FBT0YsRUFBRUcsT0FBT0MsZ0JBQWdCLENBQUNDLFVBQVUsY0FBY0MsT0FBTyxTQUFTTixFQUFFQyxHQUFHRCxFQUFFSyxVQUFVSixJQUFJLFNBQVNELEVBQUVDLEdBQUcsSUFBSSxJQUFJQyxLQUFLRCxFQUFFQSxFQUFFTSxlQUFlTCxLQUFLRixFQUFFRSxHQUFHRCxFQUFFQyxNQUFNRCxFQUFFQyxJQUFJLE9BQU8sU0FBU0QsRUFBRUMsR0FBRyxTQUFTTSxLQUFLVCxLQUFLVSxZQUFZUixFQUFFRCxFQUFFQyxFQUFFQyxHQUFHRCxFQUFFUyxVQUFVLE9BQU9SLEVBQUVDLE9BQU9RLE9BQU9ULElBQUlNLEdBQUdFLFVBQVVSLEVBQUVRLFVBQVUsSUFBSUYsS0FBcFUsR0FBNFVMLE9BQU9TLGVBQWVDLFFBQVEsYUFBYSxDQUFDQyxPQUFNLElBQUssSUFBSUMsTUFBTUMsUUFBUSxTQUFTQyxrQkFBa0JELFFBQVEsbUJBQW1CRSxVQUFVRixRQUFRLGFBQWFHLGVBQWVILFFBQVEsd0NBQXdDSSxPQUFPLFNBQVNwQixHQUFHLFNBQVNvQixTQUFTLE9BQU8sT0FBT3BCLEdBQUdBLEVBQUVxQixNQUFNdEIsS0FBS3VCLFlBQVl2QixLQUFLLE9BQU9ELFVBQVVzQixPQUFPcEIsR0FBR29CLE9BQU9WLFVBQVVhLGlCQUFpQixXQUFXTCxVQUFVTSxXQUFXTCxlQUFlTSxjQUFjQyxXQUFXLEtBQUtOLE9BQU9WLFVBQVVpQixPQUFPLFdBQVcsSUFBSTNCLEVBQUVELEtBQUssT0FBT2dCLE1BQU1hLGNBQWNYLGtCQUFrQlksTUFBTVQsT0FBTyxDQUFDVSxVQUFVLGVBQWVmLE1BQU1hLGNBQWNYLGtCQUFrQlksTUFBTUUsT0FBTyxDQUFDQyxhQUFZLEVBQUdDLE9BQU8sV0FBV2pDLEVBQUV1QixxQkFBcUJSLE1BQU1hLGNBQWNYLGtCQUFrQlksTUFBTUssTUFBTSxLQUFLbkMsS0FBS29DLE1BQU1DLFFBQVFyQixNQUFNYSxjQUFjWCxrQkFBa0JZLE1BQU1RLEtBQUssS0FBS3RDLEtBQUtvQyxNQUFNRyxVQUFVdkIsTUFBTWEsY0FBY1gsa0JBQWtCWSxNQUFNVSxPQUFPLEtBQUt4QixNQUFNYSxjQUFjWCxrQkFBa0J1QixPQUFPLENBQUNDLFFBQVExQyxLQUFLd0IsaUJBQWlCTyxVQUFVLHFCQUFxQixTQUFTL0IsS0FBS29DLE1BQU1PLGlCQUFpQnRCLE9BQWx5QixDQUEweUJMLE1BQU00QixXQUFXOUIsUUFBUU8sT0FBT0EiLCJmaWxlIjoiRGlhbG9nIGNvcHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBObyBjb250ZW50LCBzb3JyeSEgKi8iXSwic291cmNlUm9vdCI6IiJ9 