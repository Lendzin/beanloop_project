import React from 'react'
import styled from 'styled-components'
import Modal, {ModalProps} from '@material-ui/core/Modal'
import {resetTemplate} from '../../actions/userActions'
import {connect} from 'react-redux'
const StyledModal = styled(Modal)`
  width: 80vw;
  margin: 0 auto;
  margin-top: 250px;
` as React.ComponentType<ModalProps>

const ModalWrapper = (props: any) => {
  const {children, isOpen, handleClose, resetTemplate} = props

  const runOnClose = () => {
    handleClose()
    if (resetTemplate) {
      resetTemplate()
    }
  }

  return (
    <>
      <StyledModal onClose={runOnClose} open={isOpen}>
        <span>{children}</span>
      </StyledModal>
    </>
  )
}
const mapStateToProps = (state: any) => ({reRender: state.user.reRender})

const ConnectedComponent = connect(
  mapStateToProps,
  {resetTemplate}
)(ModalWrapper)

export {ConnectedComponent as ModalWrapper}
